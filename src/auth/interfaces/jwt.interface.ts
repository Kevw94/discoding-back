import { ObjectId } from 'mongodb';

export interface JwtPayload {
	id: string | ObjectId;
	email: string;
	iat: number;
	exp: number;
}

export interface JwtRequest {
	user: JwtUser;
}

export interface JwtUser {
	userId: string;
	email: string;
}
