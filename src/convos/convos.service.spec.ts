import { Test, TestingModule } from '@nestjs/testing';
import { ConvosService } from './convos.service';

describe('ConvosService', () => {
  let service: ConvosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConvosService],
    }).compile();

    service = module.get<ConvosService>(ConvosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
