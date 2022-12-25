import { Injectable } from '@nestjs/common';
import { selectDTO } from './models/dto/select.dto';
import { SurveyRecord } from './models/survey-record';
import { SurveyRepository } from './survey-repository';

@Injectable()
export class CompensationDataService {
  constructor(private readonly surveyRepo: SurveyRepository) {}

  isReady(): boolean {
    return this.surveyRepo.isReady;
  }

  selectData(queryParams: selectDTO): SurveyRecord[] {
    if (!this.surveyRepo.isReady) {
      throw new Error('the service is still processing the data. please wait');
    }
    console.log(queryParams);

    return [];
  }
}
