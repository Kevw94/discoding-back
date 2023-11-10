import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ServersRepository } from './servers.repository';
import { CreateServerDTO } from './dto/servers.dto';
import { Server } from './interfaces/servers.interface';

@Injectable()
export class ServersService {
	constructor(
		@Inject(forwardRef(() => ServersRepository))
		private serversRepository: ServersRepository,
	) {}

	async getAllServersMe(userId: string) {
		const serversMe = await this.serversRepository.findMany({
			owner_id: userId,
		});
		return serversMe;
	}

	async createServer(userId: string, payload: Server) {
		payload.owner_id = userId;
		payload.created_at = new Date();

		const serverCreated =
			await this.serversRepository.createServer(payload);
		const serverToRetreive = await this.serversRepository.findOne({
			_id: serverCreated.insertedId,
		});
		return serverToRetreive;
	}
}
