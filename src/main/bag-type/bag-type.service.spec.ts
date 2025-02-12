import { Test, TestingModule } from '@nestjs/testing';
import { BagTypeService } from './bag-type.service';

describe('BagTypeService', () => {
  let service: BagTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BagTypeService],
    }).compile();

    service = module.get<BagTypeService>(BagTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
