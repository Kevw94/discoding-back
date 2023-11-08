import { MailerAskToken } from '@/external-module/mailjet/interfaces/mailjet.interface';
import { MailjetService } from '@/external-module/mailjet/mailjet.service';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';


Injectable();
export class MailjetListeners {
	constructor(
		@Inject(MailjetService)
		private readonly mailjetService: MailjetService,
	) {}

	@OnEvent('Events.askActivationToken')
	async handleaskActivationToken(payload: MailerAskToken) {
		const code =  payload.token
		const email = payload.email
		this.mailjetService.sendUniversalEmail({
			templateId: 5287411,
			recipients: [{ Email: email }],
			args: { code: code },
		});
		this.mailjetService.tyActivateAccount(payload);
	}
}
