import { Range } from './range';

test('range from "25-34" string', () => {
  expect(Range.fromString('25-34')).toEqual<Range>(new Range(25, 34, ''));
});

test('range from "25 - 34 years old" string', () => {
  expect(Range.fromString('25 - 34 years old')).toEqual<Range>(new Range(25, 34, 'years old'));
});

test('range from "65 or over" string', () => {
  expect(Range.fromString('65 or over')).toEqual<Range>(new Range(65, Range.MAX_RANGE, ''));
});

test('range from "65 years or more" string', () => {
  expect(Range.fromString('65 years or more')).toEqual<Range>(new Range(65, Range.MAX_RANGE, 'years'));
});

test('range from "1 year or less" string', () => {
  expect(Range.fromString('1 year or less')).toEqual<Range>(new Range(Range.MIN_RANGE, 1, 'year'));
});
