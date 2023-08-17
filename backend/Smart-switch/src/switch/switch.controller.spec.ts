import { Test, TestingModule } from '@nestjs/testing';
import { SwitchController } from './switch.controller';

describe('SwitchController', () => {
  let controller: SwitchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwitchController],
    }).compile();

    controller = module.get<SwitchController>(SwitchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
