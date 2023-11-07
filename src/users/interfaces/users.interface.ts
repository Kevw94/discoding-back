import { ObjectId } from 'mongodb';

export enum Status {
	ACTIVE = 0,
	INACTIVE = 1
}

export interface User {
	_id?: ObjectId
	profile?: UserProfile;
	is_active?: boolean
	status?: Status
	bio?: string
	created_at?: Date
	profile_pricture?: string
	users_blocked?: Array<ObjectId>
	friends?: Array<ObjectId>
	activation_token?: string
}

export interface UserProfile {
	username?: string;
	email?: string;
	password?: string;
}