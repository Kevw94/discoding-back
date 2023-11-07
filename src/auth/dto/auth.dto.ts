import { IsNotEmpty, IsString, Length } from 'class-validator';

export class DTOAuthSignup {
	@IsNotEmpty()
	@IsString()
	@Length(2, 50)
	public username: string;

	@IsNotEmpty()
	@IsString()
	@Length(8, 127)
	public email: string;

	@IsNotEmpty()
	@IsString()
	@Length(8, 40)
	public password: string;
}

export class DTOAuthSignin {
	@IsNotEmpty()
	@IsString()
	@Length(8, 127)
	public email: string;

	@IsNotEmpty()
	@IsString()
	@Length(8, 40)
	public password: string;
}


export class DTOActivationToken {
	@IsNotEmpty()
	@IsString()
	@Length(6, 6)
	public activationToken: string;
}
