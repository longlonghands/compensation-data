import { Test, TestingModule } from '@nestjs/testing';
import { CompensationDataCtrlr } from './compensation-data.ctrlr';
import { CompensationDataService } from './compensation-data.service';
import { SurveyRepository } from './survey-repository';
import * as operations from './operations';

jest.setTimeout(10000);

describe('AppController', () => {
  let appController: CompensationDataCtrlr;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CompensationDataCtrlr],
      providers: [CompensationDataService, SurveyRepository],
    }).compile();

    appController = app.get<CompensationDataCtrlr>(CompensationDataCtrlr);
  });

  describe('alive', () => {
    it('should return "ok"', async () => {
      await operations.wait(3000);
      expect(appController.isAlive()).toBe('ok');
    });
  });

  describe('ready after all data loaded', () => {
    it('should return "ok"', async () => {
      await operations.waitUntil(
        10000, // 10 seconds?!!!! needs another work around or no unit test for big data
        () => {
          try {
            return appController.isReady() === 'ok';
          } catch {
            return false;
          }
        },
        200,
      );
      expect(appController.isReady()).toBe('ok');
    });
  });
});
