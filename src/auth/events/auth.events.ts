import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MailjetAskToken } from './auth.events.req';

@Injectable()
export class AuthEventEmitter {
	constructor(private eventEmitter: EventEmitter2) {}

	async askActivationToken(email: string, token: string) {
		this.eventEmitter.emit('Events.askActivationToken', new MailjetAskToken(email, token));
	}
}
