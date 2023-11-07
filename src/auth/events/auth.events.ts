import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthEventEmitter {
	constructor(private eventEmitter: EventEmitter2) {}

	async askActivationToken(email: string, token: string) {
		this.eventEmitter.emit('Events.askActivationToken', { email, token });
	}
}
