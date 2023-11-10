import { ObjectId } from 'mongodb';

export interface Convo {
	_id?: ObjectId;
	user_one?: ObjectId | string;
	user_two?: ObjectId | string;
	updated_at?: Date;
	content?: Array<ObjectId>;
}
