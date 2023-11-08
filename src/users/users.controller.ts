import { Controller, Get, Res, Request, UseGuards, Patch, Req, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Jwt } from '@/common/decorators/jwt.decorator';
import { ObjectId } from 'mongodb';
import { Response } from 'express';
import { JwtRequest } from '@/auth/interfaces/jwt.interface';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { UpdateUserProfileDTO } from './dto/users.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('')
	async getUsers(@Res() res: Response) {
		const users = await this.usersService.getAllUsers()
		return res.status(200).json({ status: 'ok', users: users});
	}

	@Patch("profile")
	async updateUserProfile(@Req() req: JwtRequest, @Body() body: UpdateUserProfileDTO, @Res() res: Response) {
		const newProfile = await this.usersService.updateUserProfile(req.user.userId, body);
		return res.status(200).json({ status: 'ok', profile: newProfile });
	}

}
