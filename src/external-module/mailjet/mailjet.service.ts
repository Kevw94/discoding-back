import { Inject, Injectable, Logger } from '@nestjs/common';
import { EmailConstructorOptions, MailerAskToken } from './interfaces/mailjet.interface';
import { Client } from 'node-mailjet';

@Injectable()
export class MailjetService {
	async tyActivateAccount(payload: MailerAskToken) {
		console.log('payload activate account', payload);
	}
	constructor(@Inject('MAILJET_CLIENT') private mailjet: Client) {}

	async sendUniversalEmail(options: EmailConstructorOptions) {
		try {
			if (options.templateId === undefined) throw new Error('Missing templateId');
			if (options.recipients === undefined) throw new Error('Missing recipients');

			await this.mailjet.post('send', { version: 'v3.1' }).request({
				Messages: [
					{
						To: options.recipients,
						TemplateID: options.templateId,
						Variables: { ...options.args },
						TemplateLanguage: true,
					},
				],
			});


		} catch (error) {
			Logger.error(error);
		}
	}
}
