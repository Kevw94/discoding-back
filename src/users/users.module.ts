import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from '@/external-module/database/mongo.module';
import { NotificationsGateway } from '@/common/gateways/notifications.gateway';

@Module({
	imports: [DatabaseModule],
	controllers: [UsersController],
	providers: [UsersService, UsersRepository, NotificationsGateway],
	exports: [UsersService],
})
export class UsersModule { }
