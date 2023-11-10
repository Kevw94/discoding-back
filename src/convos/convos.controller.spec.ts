import { Test, TestingModule } from '@nestjs/testing';
import { ConvosController } from './convos.controller';

describe('ConvosController', () => {
	let controller: ConvosController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ConvosController],
		}).compile();

		controller = module.get<ConvosController>(ConvosController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
