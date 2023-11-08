import { Controller, Get, Res, Request, UseGuards, Patch, Req, Body, Query, Post, Param } from '@nestjs/common';
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
		await this.usersService.updateUserProfile(req.user.userId, body);
		return res.status(200).json({ status: 'ok' });
	}

	@Get('find')
	async findOneUser(@Query('search') search: string, @Res() res: Response) {
		const users = await this.usersService.searchUser(search);
		return res.status(200).json({ status: 'ok', users});
	}

	@Get(':id')
	async getUserById(@Param('id') id: string, @Res() res: Response) {
		const user = await this.usersService.getUserById(id)
		return res.status(200).json({ status: 'ok', user});
	}

}
