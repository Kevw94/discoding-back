import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { Role } from './interfaces/roles.interface';
@Injectable()
export class RolesRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get roles() {
		return this.db.collection<Role>('roles');
	}

}
