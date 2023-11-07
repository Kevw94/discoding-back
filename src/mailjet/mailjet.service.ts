import { Injectable } from '@nestjs/common';
import { MailerAskToken } from './interfaces/mailjet.interface';

@Injectable()
export class MailjetService {
	async tyActivateAccount(payload: MailerAskToken) {
		console.log('payload activate account', payload);
	}
}
