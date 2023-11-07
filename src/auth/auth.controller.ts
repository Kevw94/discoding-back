import { Body, Controller, Get, Post, Res, UseFilters, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ServiceErrorCatcher } from '@/common/decorators/catch.decorator';
import { DTOActivationToken, DTOAuthSignin, DTOAuthSignup } from './dto/auth.dto';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { JwtRequest } from './interfaces/jwt.interface';

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
		return res.status(200).json(req.user);
	}

	@Post('activate')
	async activateAccount(@Res() res: Response, @Body() body: DTOActivationToken) {
		await this.authService.activateAccount(body);
		return res.status(201).json({ status: 'ok' });
	}
}
