import { ObjectId } from 'mongodb';

export enum TypeChannel {
	VOCAL = 0,
	MESSAGE = 1
}

export interface Channel {
	_id?: ObjectId
	name?: string
	type?: TypeChannel
	server_id?: ObjectId | string
	content?: []
	is_private?: boolean
	access_role: []
}