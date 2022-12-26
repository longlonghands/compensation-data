import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { wait } from './../src/operations';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await wait(2000);
  });

  it('/compensation_data (sample 1)', async () => {
    const resp = await request(app.getHttpServer()).get(
      '/compensation_data?salary[gte]=12000&location=Los+Angeles&sort=salary',
    );
    expect(resp.status).toEqual(200);
    expect(resp.body).toBeDefined();
    expect(Array.isArray(resp.body)).toBeTruthy();
    expect(resp.body.length > 1).toBeTruthy();
  });
});
