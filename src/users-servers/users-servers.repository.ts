import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { UsersServer } from './interfaces/users-servers.interface';
@Injectable()
export class UsersServersRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get usersServers() {
		return this.db.collection<UsersServer>('users-servers');
	}

}
