import { ObjectId } from 'mongodb';

export interface Role {
	_id?: ObjectId
	name?: string
	server_id?: ObjectId | string
	chan_access?: boolean
	chan_msg?: boolean
	chan_manage?: boolean
	roles_manage?: boolean
	vocal_access?: boolean
	delete_msg?: boolean
	ban_users?: boolean
}