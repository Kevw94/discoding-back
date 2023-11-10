import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ChannelsRepository } from './channels.repository';
import { Channel } from './interfaces/channels.interface';

@Injectable()
export class ChannelsService {
	constructor(
		@Inject(forwardRef(() => ChannelsRepository))
		private channelssRepository: ChannelsRepository,
	) {}

	async createChannel(payload: Channel) {
		const createChannel =
			await this.channelssRepository.createChannel(payload);
		const channelToRetreive = await this.channelssRepository.findOne({
			_id: createChannel.insertedId,
		});
		return channelToRetreive;
	}

	async getChannelsByServerId(serverId: string) {
		const channels = await this.channelssRepository.findMany({
			server_id: serverId,
		});

		return channels;
	}
}
