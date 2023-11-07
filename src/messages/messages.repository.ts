import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
@Injectable()
export class MessagesRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get messages() {
		return this.db.collection('messages');
	}

}
