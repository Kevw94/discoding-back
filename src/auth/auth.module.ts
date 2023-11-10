import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/users/users.module';
import { AuthEventEmitter } from './events/auth.events';
import { JwtModule } from '@nestjs/jwt';
import { config } from '@/config/config';
import { LocalStrategy } from './strategies/local.stategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailjetModule } from '@/external-module/mailjet/mailjet.module';
import { MailjetListeners } from '@/common/providers/mailjet.provider';
import { DatabaseModule } from '@/external-module/database/mongo.module';

@Module({
	imports: [
		DatabaseModule,
		MailjetModule,
		forwardRef(() => UsersModule),
		JwtModule.register({
			secret: config.jwt.secret,
			signOptions: { expiresIn: '30d' },
		}),
	],
	providers: [
		AuthService,
		AuthEventEmitter,
		LocalStrategy,
		JwtStrategy,
		MailjetListeners,
	],
	controllers: [AuthController],
})
export class AuthModule {}
