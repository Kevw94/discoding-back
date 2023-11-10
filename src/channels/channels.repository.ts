import { Inject, Injectable } from '@nestjs/common';
import {
	Db,
	Filter,
	FindOneAndUpdateOptions,
	FindOptions,
	UpdateFilter,
} from 'mongodb';
import { Channel } from './interfaces/channels.interface';
@Injectable()
export class ChannelsRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get channels() {
		return this.db.collection<Channel>('channels');
	}

	async createChannel(query: Channel) {
		return this.channels.insertOne(query);
	}
  
	async updateOneChannel(
		query: Filter<Channel>,
		update: Partial<Channel> | UpdateFilter<Channel>,
	) {

		return this.channels.updateOne(query, update);
	}

	async findOneAndUpdateChannel(
		query: Filter<Channel>,
		update: UpdateFilter<Channel>,
		options: FindOneAndUpdateOptions = undefined,
	) {
		return this.channels.findOneAndUpdate(query, update, options);
	}

	async findOne(
		query: Filter<Channel>,
		options: FindOptions<Channel> = undefined,
	) {
		return this.channels.findOne(query, options);
	}

	async ChannelExist(query: Filter<Channel>) {
		const options = { projection: { _id: 1 } };
		return this.channels.findOne(query, options);
	}

	async findMany(
		query: Filter<Channel>,
		options: FindOptions<Channel> = undefined,
	) {
		return this.channels.find(query, options).toArray();
	}
	async getAllChannels() {
		return this.channels.find().toArray();
	}
}
