import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateServerDTO {
	@IsNotEmpty()
	@IsString()
	@Length(3, 127)
	public name: string;

	@IsNotEmpty()
	@IsString()
	public picture: string;

	@IsOptional()
	@IsString()
	public banner: string;
}
