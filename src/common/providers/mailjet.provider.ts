import { config } from '@/config/config';
import { MailerAskResetPassword, MailerAskToken } from '@/external-module/mailjet/interfaces/mailjet.interface';
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
	}

	@OnEvent('Events.askResetPassword')
	async handleAskResetPassword(payload: MailerAskResetPassword) {
		const urlReset =  `${config.app.baseUrl}:${config.app.port}/reset-password?token=${payload.tokenUrl}`
		const email = payload.email
		this.mailjetService.sendUniversalEmail({
			templateId: 5289038,
			recipients: [{ Email: email }],
			args: { url: urlReset },
		});
	}
}
