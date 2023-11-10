import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChannelDTO {
	@IsNotEmpty()
	@IsString()
	public name: string;

	@IsNotEmpty()
	@IsString()
	server_id: string;
}

