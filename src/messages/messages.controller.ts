import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtRequest } from '@/auth/interfaces/jwt.interface';
import { CreateMessageDTO } from './dto/messages.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
	constructor(private readonly messagesService: MessagesService) {}

	@Get(":id")
	async getMessagesByConvId(@Param('id') id: string, @Res() res: Response) {
		const messages = await this.messagesService.getMessagesByConvId(id)
		return res.status(201).json({ status: 'ok', messages: messages});
	}

	@Post("create")
	async createMessage(@Req() req: JwtRequest, @Res() res: Response, @Body() body: CreateMessageDTO) {
		const newMessage = await this.messagesService.createMessage(req.user.userId, body)
		return res.status(201).json({ status: 'ok', newMessage: newMessage});
	}
}
