export interface Operator {
  lt?: number;
  lte?: number;
  eq?: number;
  gte?: number;
  gt?: number;
}

// TODO: add validation

export interface selectDTO {
  age?: Operator;
  exprience?: Operator;
  salary?: Operator;
  currency?: string;
  sort?: 'age' | 'industry' | 'job_title' | 'salary' | 'currency' | 'location' | 'exprience';
}
