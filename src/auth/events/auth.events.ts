import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MailjetAskResetPassword, MailjetAskToken } from './auth.events.req';

@Injectable()
export class AuthEventEmitter {
	constructor(private eventEmitter: EventEmitter2) {}

	async askActivationToken(email: string, token: string) {
		this.eventEmitter.emit('Events.askActivationToken', new MailjetAskToken(email, token));
	}

	async askResetPassword(email: string, tokenUrl: string) {
		console.log(email, tokenUrl);

		this.eventEmitter.emit('Events.askResetPassword', new MailjetAskResetPassword(email, tokenUrl))
	}
}
