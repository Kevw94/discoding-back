import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { Convo } from './interfaces/convos.interface';
@Injectable()
export class ConvosRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get convos() {
		return this.db.collection<Convo>('convos');
	}

}
