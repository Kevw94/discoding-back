import { ObjectId } from 'mongodb';

export enum Status {
	ACTIVE = 0,
	INACTIVE = 1
}

export interface User {
	_id?: ObjectId
	pseudo?: string
	is_active?: boolean
	status?: Status
	bio?: string
	created_at?: Date
	email?: string
	password?: string
	profile_pricture?: string
	users_blocked?: Array<ObjectId>
	friends?: Array<ObjectId>
	activation_code?: string
}