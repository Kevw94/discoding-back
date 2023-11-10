import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConvoDTO {
	@IsNotEmpty()
	@IsString()
	public user_two: string;
}
