import {
	Body,
	Controller,
	Get,
	Post,
	Res,
	UseFilters,
	UseGuards,
	Request,
	Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ServiceErrorCatcher } from '@/common/decorators/catch.decorator';
import {
	DTOActivationToken,
	DTOAskResetPassword,
	DTOAuthSignin,
	DTOAuthSignup,
	DTOResetPassword,
} from './dto/auth.dto';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { JwtRequest } from './interfaces/jwt.interface';
import { Jwt } from '@/common/decorators/jwt.decorator';
import { ObjectId } from 'mongodb';

@Controller('auth')
@UseFilters(ServiceErrorCatcher)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	async signup(@Body() body: DTOAuthSignup, @Res() res: Response) {
		await this.authService.signup(body);
		return res.status(201).json({ status: 'ok' });
	}

	@UseGuards(LocalAuthGuard)
	@Post('signin')
	async signin(@Body() body: DTOAuthSignin, @Res() res: Response) {
		const { access_token } = await this.authService.signin(body);
		return res.status(201).json({ status: 'ok', access_token });
	}

	@UseGuards(JwtAuthGuard)
	@Get('me')
	async getMe(@Request() req: JwtRequest, @Res() res: Response) {
		const currentUser = await this.authService.retrieveCurrentUser(
			req.user.userId,
		);
		return res.status(200).json({ status: 'ok', user: currentUser });
	}

	@Post('activate')
	async activateAccount(
		@Res() res: Response,
		@Body() body: DTOActivationToken,
	) {
		await this.authService.activateAccount(body);
		return res.status(201).json({ status: 'ok' });
	}

	@Post('ask-reset-password')
	async askResetPassword(
		@Res() res: Response,
		@Body() body: DTOAskResetPassword,
	) {
		await this.authService.askResetPassword(body.email);
		return res.status(201).json({ status: 'ok' });
	}

	@Post('reset-password')
	async resetPassword(
		@Res() res: Response,
		@Body() body: DTOResetPassword,
		@Query('token') token: string,
	) {
		await this.authService.resetPassword(body, token);
		return res.status(201).json({ status: 'ok' });
	}
}
