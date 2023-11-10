import { Module } from '@nestjs/common';
import { ConvosController } from './convos.controller';
import { ConvosService } from './convos.service';
import { ConvosRepository } from './convos.repository';
import { DatabaseModule } from '@/external-module/database/mongo.module';

@Module({
	imports: [DatabaseModule],
	controllers: [ConvosController],
	providers: [ConvosService, ConvosRepository],
})
export class ConvosModule {}
