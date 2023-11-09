import { Inject, Injectable } from '@nestjs/common';
import { Db, Filter, FindOneAndUpdateOptions, FindOptions, UpdateFilter } from 'mongodb';
import { Server } from './interfaces/servers.interface';
@Injectable()
export class ServersRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get servers() {
		return this.db.collection<Server>('servers');
	}

	async createServer(query: Server) {
		return this.servers.insertOne(query);
	}

	async updateOneServer(query: Filter<Server>, update: Partial<Server> | UpdateFilter<Server>) {
		return this.servers.updateOne(query, update);
	}

	async findOneAndUpdateServer(
		query: Filter<Server>,
		update: UpdateFilter<Server>,
		options: FindOneAndUpdateOptions = undefined,
	) {
		return this.servers.findOneAndUpdate(query, update, options);
	}

	async findOne(query: Filter<Server>, options: FindOptions<Server> = undefined) {
		return this.servers.findOne(query, options);
	}

	async ServerExist(query: Filter<Server>) {
		const options = { projection: { _id: 1 } };
		return this.servers.findOne(query, options);
	}
	async findMany(query: Filter<Server>, options: FindOptions<Server> = undefined) {
		return this.servers.find(query, options).toArray();
	}
	async getAllServers() {
		return this.servers.find().toArray();
	}


}
