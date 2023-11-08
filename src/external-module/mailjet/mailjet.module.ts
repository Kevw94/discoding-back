import { Module } from '@nestjs/common';
import { MailjetService } from './mailjet.service';
import { config } from '@/config/config';
import * as mailj from 'node-mailjet';


@Module({
	providers: [
		{
			provide: 'MAILJET_CLIENT',
			useFactory: async (): Promise<mailj.Client> => {
				const mailjet = mailj.Client.apiConnect(config.mailjet.user, config.mailjet.pass);

				return mailjet;
			},
		},
		MailjetService,
	],
	exports: [MailjetService],
})
export class MailjetModule { }
