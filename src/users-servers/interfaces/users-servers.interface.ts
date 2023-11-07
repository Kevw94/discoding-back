import { ObjectId } from 'mongodb';

export interface UsersServer {
	_id?: ObjectId
	user_id?: ObjectId | string
	server_id?: ObjectId | string
	position?: number
	roles?: Array<ObjectId>
}