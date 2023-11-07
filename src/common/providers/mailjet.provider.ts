import { MailerAskToken } from '@/mailjet/interfaces/mailjet.interface';
import { MailjetService } from '@/mailjet/mailjet.service';
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
		this.mailjetService.tyActivateAccount(payload);
	}
}
