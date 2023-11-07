import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { User } from './interfaces/users.interface';
@Injectable()
export class UsersRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get users() {
		return this.db.collection<User>('users');
	}

}
