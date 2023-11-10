export class MailjetAskToken {
	email: string;
	token: string;

	constructor(email: string, token: string) {
		this.email = email;
		this.token = token;
	}
}

export class MailjetAskResetPassword {
	email: string;
	tokenUrl: string;

	constructor(email: string, tokenUrl: string) {
		this.email = email;
		this.tokenUrl = tokenUrl;
	}
}
