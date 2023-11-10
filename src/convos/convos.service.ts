import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConvosRepository } from './convos.repository';
import { Convo } from './interfaces/convos.interface';

@Injectable()
export class ConvosService {
	constructor(
		@Inject(forwardRef(() => ConvosRepository))
		private convosRepository: ConvosRepository,
	) {}

	async createConvo(userId: string, payload: Convo) {
		payload.user_one = userId;
		payload.updated_at = new Date();
		payload.content = [];

		const newConv = await this.convosRepository.createConvo(payload);
		const convToRetreive = await this.convosRepository.findOne({
			_id: newConv.insertedId,
		});
		return convToRetreive;

	}

	async getConvosByUser(userId: string) {
		const convosUser = await this.convosRepository.findOne({
			$or: [
				{

					user_one: userId,
				},
				{
					user_two: userId,
				},
			],
		});

		return convosUser;
	}
}
