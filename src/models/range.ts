export class Range {
  static readonly MAX_RANGE = 999999;
  static readonly MIN_RANGE = 0;

  static fromString(param: string): Range {
    param.trim().toLowerCase();
    const underThanMatch = /^under\s*(\d+)(.+)?$/g.exec(param);
    if (underThanMatch && underThanMatch.length > 2) {
      const max = Number.parseInt(underThanMatch[1]);
      const unit = underThanMatch[2] ? underThanMatch[2].trim() : '';
      return new Range(Range.MIN_RANGE, max, unit);
    }
    param.trim().toLowerCase();
    const orLessMatched = /^(\d+)\s+(\w*\s+)?or\s+less$/g.exec(param);
    if (orLessMatched && orLessMatched.length > 2) {
      const max = Number.parseInt(orLessMatched[1]);
      const unit = orLessMatched[2] ? orLessMatched[2].trim() : '';
      return new Range(Range.MIN_RANGE, max, unit);
    }
    const orMoreMatched = /^(\d+)\s+(\w*\s+)?or\s+(more|over)$/g.exec(param);
    if (orMoreMatched && orMoreMatched.length > 2) {
      const min = Number.parseInt(orMoreMatched[1]);
      const unit = orMoreMatched[2] ? orMoreMatched[2].trim() : '';
      return new Range(min, Range.MAX_RANGE, unit);
    }
    const strRange = /^(\d+)\s*\-\s*(\d+)\s*(.+)?$/g.exec(param);
    if (strRange) {
      const min = Number.parseInt(strRange[1]);
      const max = Number.parseInt(strRange[2]);
      const unit = strRange[3] ? strRange[3].trim() : '';
      return new Range(min, max, unit);
    }
    throw new Error('invalid param');
  }

  constructor(readonly min: number, readonly max: number, readonly unit: string) {}

  compare(other: Range): number {
    if (other.min >= this.max || other.max >= this.max) {
      return -1;
    }
    if (this.min <= other.min && this.max >= other.max) {
      return 0;
    }
    if (other.max <= this.min || other.min <= this.min) {
      return 1;
    }
  }

  compareWithNumber(years: number): number {
    if (years < this.min) {
      return 1;
    } else if (years >= this.min && years <= this.max) {
      return 0;
    } else {
      return -1;
    }
  }

  toString(): string {
    if (this.min === Range.MIN_RANGE) {
      return `${this.max} ${this.unit} or less`;
    }
    if (this.max === Range.MAX_RANGE) {
      return `${this.min} ${this.unit} or more`;
    }
    return `${this.min} - ${this.max} ${this.unit}`;
  }
}
