import '@/config/env.validator';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { config } from '@/config/config';

async function bootstrap() {
	const PORT = config.app.port;
	const app = await NestFactory.create(AppModule);
	await app.listen(PORT);
	return app.getUrl();
}
(async (): Promise<void> => {
	try {
		const url = await bootstrap();
		Logger.debug(`Nest application running at : ${url}`, 'Bootstrap');
	} catch (error) {
		Logger.error(error, 'Bootstrap');
	}
})();

