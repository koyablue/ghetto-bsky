import { Test, TestingModule } from '@nestjs/testing';
import { AtProtoService } from './at-proto.service';

describe('AtProtoService', () => {
  let service: AtProtoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtProtoService],
    }).compile();

    service = module.get<AtProtoService>(AtProtoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
