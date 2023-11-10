import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { DatabaseModule } from '@/external-module/database/mongo.module';
import { MessagesRepository } from './messages.repository';

@Module({
	imports: [DatabaseModule],
	controllers: [MessagesController],
	providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
