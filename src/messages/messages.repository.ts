import { Inject, Injectable } from '@nestjs/common';
import {
	Db,
	Filter,
	FindOneAndUpdateOptions,
	FindOptions,
	UpdateFilter,
} from 'mongodb';
import { Message } from './interfaces/messages.interface';
@Injectable()
export class MessagesRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get messages() {
		return this.db.collection<Message>('messages');
	}

	async createMessage(query: Message) {
		return this.messages.insertOne(query);
	}

	async updateOneMessage(
		query: Filter<Message>,
		update: Partial<Message> | UpdateFilter<Message>,
	) {
		return this.messages.updateOne(query, update);
	}

	async findOneAndUpdateMessage(
		query: Filter<Message>,
		update: UpdateFilter<Message>,
		options: FindOneAndUpdateOptions = undefined,
	) {
		return this.messages.findOneAndUpdate(query, update, options);
	}

	async findOne(
		query: Filter<Message>,
		options: FindOptions<Message> = undefined,
	) {
		return this.messages.findOne(query, options);
	}

	async MessageExist(query: Filter<Message>) {
		const options = { projection: { _id: 1 } };
		return this.messages.findOne(query, options);
	}
	async findMany(
		query: Filter<Message>,
		options: FindOptions<Message> = undefined,
	) {
		return this.messages.find(query, options).toArray();
	}
	async getAllMessages() {
		return this.messages.find().toArray();
	}
}
