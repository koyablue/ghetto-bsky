import { Test, TestingModule } from '@nestjs/testing';
import { AtProtoController } from './at-proto.controller';
import { AtProtoService } from './at-proto.service';

describe('AtProtoController', () => {
  let controller: AtProtoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtProtoController],
      providers: [AtProtoService],
    }).compile();

    controller = module.get<AtProtoController>(AtProtoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
