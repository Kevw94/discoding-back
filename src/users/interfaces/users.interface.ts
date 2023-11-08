import { ObjectId } from 'mongodb';

export enum Status {
	ACTIVE = 0,
	INACTIVE = 1
}

export enum RequestStatus {
	PENDING = 0,
	ACCEPTED = 1,
	DENIED = 2
}

export interface User {
	_id?: ObjectId
	profile?: UserProfile;
	is_active?: boolean
	status?: Status
	created_at?: Date
	users_blocked?: Array<ObjectId>
	friends?: Array<ObjectId>
	activation_token?: string
	reset_password?: string
	received_requests?: Array<ReceivedRequest>
}

export interface UserProfile {
	username?: string;
	email?: string;
	password?: string;
	bio?: string
	profile_picture?: string
}

export interface ReceivedRequest {
	userId: string
	status: RequestStatus
}