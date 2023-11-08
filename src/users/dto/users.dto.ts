import { IsArray, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RequestStatus } from '../interfaces/users.interface';


export class UserProfileDTO {
	@IsNotEmpty()
	@IsString()
	@Length(2, 50)
	public username: string;

	@IsNotEmpty()
	@IsString()
	@Length(8, 127)
	public email: string;

	@IsString()
	@Length(0, 400)
	public bio: string;

	@IsString()
	@Length(8, 127)
	public profile_picture: string;
}

export class ReceivedRequestDTO {
	@IsNotEmpty()
	@IsString()
	userId: string

	@IsEnum(RequestStatus)
	status: RequestStatus
}

export class UpdateUserProfileDTO {
	@ValidateNested()
	@IsNotEmpty()
	@IsObject()
	@Type(() => UserProfileDTO)
	profile: UserProfileDTO;

	@IsOptional()
	@IsString({ each: true })
	users_blocked: Array<string>

	@IsOptional()
	@IsString({ each: true })
	friends: Array<string>

	@IsOptional()
	@ValidateNested()
	@IsArray()
	@Type(() => ReceivedRequestDTO)
	received_requests: Array<ReceivedRequestDTO>
}

export class AddFriendDTO {
	@IsNotEmpty()
	@IsString()
	userId: string
}

export class AcceptFriendDTO {
	@IsNotEmpty()
	@IsString()
	userId: string
}

export class DeclineFriendDTO {
	@IsNotEmpty()
	@IsString()
	userId: string
}