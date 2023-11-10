import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { Message } from './interfaces/messages.interface';

@Injectable()
export class MessagesService {
	constructor(
		@Inject(forwardRef(() => MessagesRepository))
		private messagesRepository: MessagesRepository,

	) {}

	async createMessage(userId: string, payload: Message) {
		payload.user_id = userId;
		payload.created_at = new Date();

		const newMessage = await this.messagesRepository.createMessage(payload);
		const messageToRetreive = await this.messagesRepository.findOne({
			_id: newMessage.insertedId,
		});

		return messageToRetreive;
	}

	async getMessagesByConvId(idConv: string) {
		const messages = await this.messagesRepository.findMany({
			id_conv: idConv,
		});
		return messages;

	}
}
