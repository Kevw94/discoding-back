import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { ServersService } from './servers.service';
import { Response } from 'express';
import { JwtRequest } from '@/auth/interfaces/jwt.interface';
import { CreateServerDTO } from './dto/servers.dto';

@Controller('servers')
@UseGuards(JwtAuthGuard)
export class ServersController {
	constructor(private readonly serversService: ServersService) {}

	@Get('')
	async getServers(@Req() req: JwtRequest, @Res() res: Response) {
		const serversMe = await this.serversService.getAllServersMe(
			req.user.userId,
		);
		return res.status(200).json({ status: 'ok', servers: serversMe });
	}

	@Post('create')
	async createServer(
		@Req() req: JwtRequest,
		@Res() res: Response,
		@Body() body: CreateServerDTO,
	) {
		const newServer = await this.serversService.createServer(
			req.user.userId,
			body,
		);
		return res.status(201).json({ status: 'ok', server: newServer });
	}
}
