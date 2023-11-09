import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { DatabaseModule } from '@/external-module/database/mongo.module';
import { ChannelsRepository } from './channels.repository';

@Module({
	imports: [DatabaseModule],
	providers: [ChannelsService, ChannelsRepository],
	controllers: [ChannelsController]
})
export class ChannelsModule { }
