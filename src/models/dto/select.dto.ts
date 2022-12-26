export interface Operator {
  lt?: number | string;
  lte?: number | string;
  eq?: number | string;
  gte?: number | string;
  gt?: number | string;
}

// TODO: add validation

export interface selectDTO {
  age?: Operator;
  exprience?: Operator;
  salary?: Operator;
  industry?: string;
  job_title: string;
  currency?: string;
  location?: string;
  sort?: 'age' | 'industry' | 'job_title' | 'salary' | 'currency' | 'location' | 'exprience';
}
