import { Module } from '@nestjs/common';
import { ServersController } from './servers.controller';
import { ServersService } from './servers.service';
import { DatabaseModule } from '@/external-module/database/mongo.module';
import { ServersRepository } from './servers.repository';

@Module({
	imports: [DatabaseModule],
	controllers: [ServersController],
	providers: [ServersService, ServersRepository]
})
export class ServersModule { }
