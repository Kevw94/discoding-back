import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConvosService } from './convos.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { JwtRequest } from '@/auth/interfaces/jwt.interface';
import { Response } from 'express';
import { CreateConvoDTO } from './dto/convos.dto';

@Controller('convos')
@UseGuards(JwtAuthGuard)
export class ConvosController {
	constructor(private readonly convosService: ConvosService) {}

	@Get("")
	async getConvosByUser(@Req() req: JwtRequest, @Res() res: Response) {
		const convoUser = await this.convosService.getConvosByUser(req.user.userId)
		return res.status(201).json({ status: 'ok', conv: convoUser});
	}

	@Post('create')
	async createConvos(@Req() req: JwtRequest, @Res() res: Response, @Body() body: CreateConvoDTO) {
		const newConv = await this.convosService.createConvo(req.user.userId, body)
		return res.status(201).json({ status: 'ok', newConv: newConv});
	}

}
