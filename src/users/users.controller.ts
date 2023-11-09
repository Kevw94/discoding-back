import { Controller, Get, Res, Request, UseGuards, Patch, Req, Body, Query, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Jwt } from '@/common/decorators/jwt.decorator';
import { ObjectId } from 'mongodb';
import { Response } from 'express';
import { JwtRequest } from '@/auth/interfaces/jwt.interface';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { AddFriendDTO, DeclineFriendDTO, DeleteFriendDTO, UpdateUserProfileDTO } from './dto/users.dto';

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

	@Post('addFriends')
	async addFriends(@Res() res: Response, @Body() body: AddFriendDTO, @Req() req: JwtRequest) {
		const listRequest = await this.usersService.addFriends(req.user.userId, body)
		return res.status(201).json({ status: 'ok', listRequest});
	}

	@Post('acceptFriend')
	async acceptFriend(@Res() res: Response, @Body() body: AddFriendDTO, @Req() req: JwtRequest) {
		const listFriends = await this.usersService.acceptFriend(req.user.userId, body)
		return res.status(201).json({ status: 'ok', listFriends});
	}

	@Post('declineFriend')
	async declineFriend(@Res() res: Response, @Body() body: DeclineFriendDTO, @Req() req: JwtRequest) {
		const listFriends = await this.usersService.declineFriend(req.user.userId, body)
		return res.status(201).json({ status: 'ok', listFriends});
	}

	@Post('deleteFriend')
	async deleteFriend(@Res() res: Response, @Body() body: DeleteFriendDTO, @Req() req: JwtRequest) {
		const listFriends = await this.usersService.deleteFriend(req.user.userId, body)
		return res.status(201).json({ status: 'ok', listFriends});
	}
}
