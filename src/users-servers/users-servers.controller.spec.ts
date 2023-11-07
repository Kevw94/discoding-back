import { Test, TestingModule } from '@nestjs/testing';
import { UsersServersController } from './users-servers.controller';

describe('UsersServersController', () => {
  let controller: UsersServersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersServersController],
    }).compile();

    controller = module.get<UsersServersController>(UsersServersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
