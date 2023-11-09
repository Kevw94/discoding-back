import { ObjectId } from 'mongodb';

export enum TypeMessage {
	TEXT = 0,
	VIDEO = 1,
	IMAGE = 2
}

export interface Message {
	_id?: ObjectId
	user_id?: ObjectId | string
	type?: TypeMessage
	content?: string
	created_at?: Date
	is_modified?: boolean
	id_conv?: string
}