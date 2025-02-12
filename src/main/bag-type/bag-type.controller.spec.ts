import { Test, TestingModule } from '@nestjs/testing';
import { BagTypeController } from './bag-type.controller';

describe('BagTypeController', () => {
  let controller: BagTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BagTypeController],
    }).compile();

    controller = module.get<BagTypeController>(BagTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
