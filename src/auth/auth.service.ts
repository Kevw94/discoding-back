import { ServiceError } from '@/common/decorators/catch.decorator';
import { User } from '@/users/interfaces/users.interface';
import { UsersService } from '@/users/users.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { credentialsPassword } from './utils/auth.security';
import { generateCodeToken, verifyPassword } from '@/common/helpers/string.helper';
import { DTOActivationToken, DTOAuthSignin, DTOAuthSignup } from './dto/auth.dto';
import { AuthEventEmitter } from './events/auth.events';
import { JwtService } from '@nestjs/jwt';
import { ObjectId, UpdateFilter } from 'mongodb';


@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => UsersService))
		private usersService: UsersService,
		private jwtService: JwtService,
		private authEventEmitter: AuthEventEmitter,
	) {}

	async signup(payload: DTOAuthSignup) {
		const userExists = await this.usersService.isUserExists(payload.email);
		if (userExists) throw new ServiceError('BAD_REQUEST', 'Error 400');

		const { email, password, username } = payload;

		const hashedPassword = await credentialsPassword(password);

		const newUser: User = {
			profile: {
				username,
				email,
				password: hashedPassword,
			},
			is_active: false,
			created_at: new Date(),
			activation_token: generateCodeToken(),
		};

		try {
			const tryCreateUser = await this.usersService.tryRegisterUser(newUser);
			if (!tryCreateUser.acknowledged)
				throw new ServiceError('INTERNAL_SERVER_ERROR', 'Error 500');
		} catch (err) {
			throw new ServiceError('INTERNAL_SERVER_ERROR', 'Error 500');
		}

		this.authEventEmitter.askActivationToken(email, newUser.activation_token);
	}

	async validateUser(email: string, password: string) {
		const user = await this.usersService.findOneUser(email);
		if (user === null) return null;

		const isGoodPassword = await verifyPassword(user.profile.password, password);

		if (user && isGoodPassword) {
			const { password, ...result } = user.profile;
			return result;
		}
		return null;
	}

	async signin(user: DTOAuthSignin) {
		const userExists = await this.usersService.findOneUser(user.email);
		if (userExists === null) throw new ServiceError('BAD_REQUEST', 'Error 400');

		if (!userExists.is_active) throw new ServiceError('BAD_REQUEST', 'Error 400');

		const payload = { email: user.email, id: userExists._id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async activateAccount(payload: DTOActivationToken) {
		const { activationToken } = payload;
		const query = { activation_token: activationToken };
		const update: UpdateFilter<User> = {
			$unset: { activation_token: 1 },
			$set: { is_active: true },
		};
		const data = await this.usersService.findOneAndUpdateUser(query, update);
	}

	async retrieveCurrentUser(userId: string) {
		const user = await this.usersService.getUserProfile(userId)
		if (user == null)
			throw new ServiceError(
				'UNAUTHORIZED',
				'You do not have the rights to access this ressource.',
			);
		const formattedUser = { id: user._id, profile: user.profile, ...user};
		return formattedUser;
	}

	async askResetPassword(email: string) {
		const isUserExists = await this.usersService.isUserExists(email);
		if (isUserExists === null) throw new ServiceError('BAD_REQUEST', 'Error 400');
		const tokenToReset = generateCodeToken();

		await this.usersService.findOneAndUpdateUser({ _id: isUserExists._id }, { $set: { reset_password: tokenToReset } })

		this.authEventEmitter.askResetPassword(email, tokenToReset)
	}
}
