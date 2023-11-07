import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { Server } from './interfaces/servers.interface';
@Injectable()
export class ServersRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get servers() {
		return this.db.collection<Server>('servers');
	}

}
