import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Filter, FindOneAndUpdateOptions, ObjectId, UpdateFilter } from 'mongodb';
import { RequestStatus, User } from './interfaces/users.interface';
import { AddFriendDTO, UpdateUserProfileDTO } from './dto/users.dto';
import { flatten } from 'mongo-dot-notation';
import { ServiceError } from '@/common/decorators/catch.decorator';

@Injectable()
export class UsersService {
	constructor(
		@Inject(forwardRef(() => UsersRepository))
		private usersRepository: UsersRepository,
	) { }

	async tryRegisterUser(user: User) {
		return this.usersRepository.createUser(user);
	}

	async isUserExists(email: string) {
		const userExists = await this.usersRepository.userExist({ 'profile.email': email });
		return userExists;
	}

	async findOneUser(email: string) {
		const getOneUser = await this.usersRepository.findOne({ 'profile.email': email });
		return getOneUser;
	}

	async findOneAndUpdateUser(
		query: Filter<User>,
		update: UpdateFilter<User>,
		options: FindOneAndUpdateOptions = undefined,
	) {
		const updateOneUser = await this.usersRepository.findOneAndUpdateUser(
			query,
			update,
			options,
		);
		return updateOneUser;
	}

	async getUserProfile(userId: string) {
		return this.usersRepository.findOne(
			{ _id: new ObjectId(userId) },
			{ projection: { _id: 0 } },
		);
	}

	async getAllUsers() {
		return this.usersRepository.findMany({}, {
			projection: { _id: 1, "profile.password": 0 }
		});
	}

	async updateUserProfile(userId: string, body: UpdateUserProfileDTO) {
		const update = flatten(body);
		const query = { _id: new ObjectId(userId) };
		await this.usersRepository.updateOneUser(query, update);
	}

	async searchUser(search: string) {
		const query = {
			$or: [
				{ "profil.username": new RegExp(search) },
				{ "profile.email": new RegExp(search) }
			]
		};
		const users = (await this.usersRepository.findMany(query, {projection: { _id: 1, "profile.password": 0}}))
		return users
	}

	async getUserById(id: string) {
		const user = await this.usersRepository.findOne({ _id: new ObjectId(id), }, { projection: { _id: 1, "profile.password": 0 } })
		return user
	}

	async addFriends(userId: string, body: AddFriendDTO) {
		try {
			const findFriend = await this.usersRepository.findOne({_id: new ObjectId(body.userId)})
			if (findFriend === null)  throw new ServiceError('INTERNAL_SERVER_ERROR', 'Error 500');

			const isRequestSent = await this.usersRepository.findOne({
				$and: [
					{ _id: new ObjectId(userId) },
					{ sended_request:  body.userId }
				]
			})
			// Prevent from multiple same friend request
			if (isRequestSent !== null) throw new ServiceError('INTERNAL_SERVER_ERROR', 'Error 500');

			const sendedRequest = await this.usersRepository.findOneAndUpdateUser({ _id: new ObjectId(userId) }, { $push: { sended_request: body.userId } }, {  returnDocument: 'after' })
			const pendingRequest = {
				userId: userId,
				status: RequestStatus.PENDING
			}

			await this.usersRepository.findOneAndUpdateUser({ _id: new ObjectId(body.userId) }, { $push: { received_requests: pendingRequest } })

			return sendedRequest
		} catch (err) {
			throw new ServiceError('INTERNAL_SERVER_ERROR', 'Error 500');
		}
	}
}
