// "How old are you?": "25-34",
// "What industry do you work in?": "Natural Gas",
// "Job title": "Contract Administrator",
// "What is your annual salary?": "51,700",
// "Please indicate the currency": "USD",
// "Where are you located? (City/state/country)": "Gainesville FL",
// "How many years of post-college professional work experience do you have?": "8 - 10 years",
// "If your job title needs additional context, please clarify here:": "",
// "If \"Other,\" please indicate the currency here:": ""
import { SurveyRecord, deserializeFromRawData } from './models/survey-record';
import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SurveyRepository {
  private readonly invalidData: string[];
  private readonly surverRecords: SurveyRecord[];

  private _isReady = false;

  constructor() {
    this.invalidData = [];
    this.surverRecords = [];
    this.createRepoFromFile();
  }

  createRepoFromFile(): void {
    const startTime = Date.now();
    const rl = readline.createInterface({
      input: fs.createReadStream(path.resolve('./data.json')), // TODO: read the file name from configs
    });

    const obs = new Observable((observer) => {
      rl.on('line', (val) => observer.next(val)),
        rl.on('error', (err) => observer.error(err)),
        rl.on('close', () => observer.complete());
    }).pipe(
      tap((line: string) => {
        if (line.length < 50) {
          return;
        }
        try {
          line = line.substring(line.indexOf('{'), line.lastIndexOf('}') + 1);
          const data = JSON.parse(line.trim());
          const record = deserializeFromRawData(data);
          this.surverRecords.push(record);
        } catch (error) {
          console.error(`Error on deserializing the raw data: ${error}`);
          console.error(`${line}\n\n`);
          this.invalidData.push(line);
        }
      }),
    );

    obs.subscribe({
      // next: () => {},
      error: (e) => console.error(`Error reading file: ${e}`),
      complete: () => {
        const timeTook = Date.now() - startTime;
        console.log(`Reading data completed. Survery Repository is ready to be used. took ${timeTook}ms`);
        this._isReady = true;
      },
    });
  }

  get isReady(): boolean {
    return this._isReady;
  }

  getAll(): SurveyRecord[] {
    return this.surverRecords;
  }
}
