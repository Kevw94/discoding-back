import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { JwtRequest } from '@/auth/interfaces/jwt.interface';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { Response } from 'express';
import { CreateChannelDTO } from './dto/channels.dto';

@Controller('channels')
@UseGuards(JwtAuthGuard)
export class ChannelsController {
	constructor(private readonly channelsService: ChannelsService) {}


	@Get('')
	async getChannels(@Res() res: Response) {
		const channels = await this.channelsService.getAllChannels();
		return res.status(200).json({ status: 'ok', channels: channels });
	}

	@Get(':serverId')
	async getChannelsByServerId(
		@Param('serverId') serverId: string,
		@Res() res: Response,
	) {
		const channels =
			await this.channelsService.getChannelsByServerId(serverId);
		return res.status(201).json({ status: 'ok', newChannel: channels });
	}

	@Post('create')
	async createMessage(@Res() res: Response, @Body() body: CreateChannelDTO) {
		const newChannel = await this.channelsService.createChannel(body);
		return res.status(201).json({ status: 'ok', newChannel: newChannel });
	}
}
