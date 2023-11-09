import { Inject, Injectable } from '@nestjs/common';
import { Db, Filter, FindOneAndUpdateOptions, FindOptions, UpdateFilter } from 'mongodb';
import { Convo } from './interfaces/convos.interface';
@Injectable()
export class ConvosRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get convos() {
		return this.db.collection<Convo>('convos');
	}

	async createConvo(query: Convo) {
		return this.convos.insertOne(query);
	}

	async updateOneConvo(query: Filter<Convo>, update: Partial<Convo> | UpdateFilter<Convo>) {
		return this.convos.updateOne(query, update);
	}

	async findOneAndUpdateConvo(
		query: Filter<Convo>,
		update: UpdateFilter<Convo>,
		options: FindOneAndUpdateOptions = undefined,
	) {
		return this.convos.findOneAndUpdate(query, update, options);
	}

	async findOne(query: Filter<Convo>, options: FindOptions<Convo> = undefined) {
		return this.convos.findOne(query, options);
	}

	async ConvoExist(query: Filter<Convo>) {
		const options = { projection: { _id: 1 } };
		return this.convos.findOne(query, options);
	}
	async findMany(query: Filter<Convo>, options: FindOptions<Convo> = undefined) {
		return this.convos.find(query, options).toArray();
	}
	async getAllconvos() {
		return this.convos.find().toArray();
	}


}
