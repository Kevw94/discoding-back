import { Module } from '@nestjs/common';
import { UsersServersController } from './users-servers.controller';
import { UsersServersService } from './users-servers.service';

@Module({
  controllers: [UsersServersController],
  providers: [UsersServersService]
})
export class UsersServersModule {}
