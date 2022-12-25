import { Module } from '@nestjs/common';
import { CompensationDataCtrlr } from './compensation-data.ctrlr';
import { CompensationDataService } from './compensation-data.service';
import { SurveyRepository } from './survey-repository';

@Module({
  imports: [],
  controllers: [CompensationDataCtrlr],
  providers: [CompensationDataService, SurveyRepository],
})
export class AppModule {}
