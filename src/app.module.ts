import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@/external-module/database/mongo.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServersModule } from './servers/servers.module';
import { MessagesModule } from './messages/messages.module';
import { ChannelsModule } from './channels/channels.module';
import { RolesModule } from './roles/roles.module';
import { ConvosModule } from './convos/convos.module';
import { UsersServersModule } from './users-servers/users-servers.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailjetModule } from './mailjet/mailjet.module';

@Module({
	imports: [
		DatabaseModule,
		AuthModule,
		UsersModule,
		ServersModule,
		MessagesModule,
		ChannelsModule,
		RolesModule,
		ConvosModule,
		UsersServersModule,
		EventEmitterModule.forRoot(),
		MailjetModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
