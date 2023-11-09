import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { TypeMessage } from '../interfaces/messages.interface';

export class CreateMessageDTO {
	@IsOptional()
	@IsEnum(TypeMessage)
	public type: TypeMessage;

	@IsNotEmpty()
	@IsString()
	public content: string;

	@IsOptional()
	@IsBoolean()
	public is_modified: boolean;

	@IsNotEmpty()
	@IsString()
	id_conv: string

}