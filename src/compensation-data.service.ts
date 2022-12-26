import { Injectable } from '@nestjs/common';
import { Operator, selectDTO } from './models/dto/select.dto';
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
    let selected = this.surveyRepo.getAll();
    console.log(`searching ${selected.length} records using:`, queryParams);

    if (queryParams.age) {
      selected = selected.filter((rec) => rec.ageRange.compareWithOperator(queryParams.age));
      console.log(`filtered on age: ${selected.length}`);
    }
    if (queryParams.exprience) {
      selected = selected.filter((rec) => rec.workExprience.compareWithOperator(queryParams.exprience));
      console.log(`filtered on exprience: ${selected.length}`);
    }
    if (queryParams.salary) {
      selected = selected.filter((rec) => this.compareSalary(rec.salary, queryParams.salary));
      console.log(`filtered on salary: ${selected.length}`);
    }
    if (queryParams.industry) {
      selected = selected.filter((rec) => rec.industry.includes(queryParams.industry));
      console.log(`filtered on industry: ${selected.length}`);
    }
    if (queryParams.job_title) {
      selected = selected.filter((rec) => rec.jobTitle.includes(queryParams.job_title));
      console.log(`filtered on job_title: ${selected.length}`);
    }
    if (queryParams.location) {
      selected = selected.filter((rec) => rec.location.includes(queryParams.location));
      console.log(`filtered on location: ${selected.length}`);
    }
    if (queryParams.currency) {
      selected = selected.filter((rec) => rec.currency.includes(queryParams.currency));
      console.log(`filtered on currency: ${selected.length}`);
    }
    if (queryParams.sort) {
      switch (queryParams.sort) {
        case 'age':
          selected = selected.sort((a, b) => a.ageRange.compare(b.ageRange));
          break;
        case 'industry':
          selected = selected.sort((a, b) => a.industry.localeCompare(b.industry));
          break;
        case 'job_title':
          selected = selected.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
          break;
        case 'salary':
          selected = selected.sort((a, b) => a.salary - b.salary);
          break;
        case 'currency':
          selected = selected.sort((a, b) => a.currency.localeCompare(b.currency));
          break;
        case 'location':
          selected = selected.sort((a, b) => a.location.localeCompare(b.location));
          break;
        case 'exprience':
          selected = selected.sort((a, b) => a.workExprience.compare(b.workExprience));
          break;
        default:
          break;
      }
    }
    return selected;
  }

  private compareSalary(value: number, op: Operator): boolean {
    if (op.eq) {
      return value === op.eq;
    } else if (op.lt) {
      return value < op.lt;
    } else if (op.lte) {
      return value <= op.lte;
    } else if (op.gt) {
      return value > op.gt;
    } else if (op.gte) {
      return value <= op.gte;
    }
  }
}
