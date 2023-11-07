import { Module } from '@nestjs/common';
import { ConvosController } from './convos.controller';
import { ConvosService } from './convos.service';

@Module({
  controllers: [ConvosController],
  providers: [ConvosService]
})
export class ConvosModule {}
