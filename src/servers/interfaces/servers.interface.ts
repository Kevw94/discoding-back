import { ObjectId } from 'mongodb';

export interface Server {
	_id?: ObjectId
	name?: string
	picture?: string
	banner?: string
	owner_id?: ObjectId | string
	created_at?: Date
	banned?: Array<ObjectId>
}