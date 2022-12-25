import { Controller, Get, Query } from '@nestjs/common';
import { CompensationDataService } from './compensation-data.service';
import { SurveyRecord } from './models/survey-record';
import { selectDTO } from './models/dto/select.dto';

@Controller()
export class CompensationDataCtrlr {
  constructor(private readonly appService: CompensationDataService) {}

  @Get('/alive')
  isAlive(): string {
    return 'ok';
  }

  @Get('/ready')
  isReady(): string {
    if (this.appService.isReady()) {
      return 'ok';
    }
    throw new Error('service is not ready');
  }

  @Get('/compensation_data')
  getCompensationData(@Query() queryParams: selectDTO): SurveyRecord[] {
    return this.appService.selectData(queryParams);
  }
}
