import { Test, TestingModule } from '@nestjs/testing';
import { TiposController } from './tipos.controller';

describe('TiposController', () => {
  let controller: TiposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposController],
    }).compile();

    controller = module.get<TiposController>(TiposController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
