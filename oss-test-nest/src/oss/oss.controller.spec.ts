import { Test, TestingModule } from '@nestjs/testing';
import { OssController } from './oss.controller';
import { OssService } from './oss.service';

describe('OssController', () => {
  let controller: OssController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OssController],
      providers: [OssService],
    }).compile();

    controller = module.get<OssController>(OssController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
