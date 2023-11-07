import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { Channel } from './interfaces/channels.interface';
@Injectable()
export class ChannelsRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get channels() {
		return this.db.collection<Channel>('channels');
	}

}
