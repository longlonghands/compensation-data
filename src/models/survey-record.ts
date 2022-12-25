import { Range } from './range';

export class SurveyRecord {
  surveyedAt: number;

  ageRange: Range;

  industry: string;

  jobTitle: string;

  salary: number;

  currency: string;

  location: string;

  workExprience: Range;

  jobRemarks: string;

  currencyRemarks: string;

  remarks: string;
}

// "How old are you?": "25-34",
// "What industry do you work in?": "Natural Gas",
// "Job title": "Contract Administrator",
// "What is your annual salary?": "51,700",
// "Please indicate the currency": "USD",
// "Where are you located? (City/state/country)": "Gainesville FL",
// "How many years of post-college professional work experience do you have?": "8 - 10 years",
// "If your job title needs additional context, please clarify here:": "",
// "If \"Other,\" please indicate the currency here:": ""

/*
const questionTemplates = {
  'How old are you?': 'ageRange',
  'What industry do you work in?': 'industry',
  'Job title': 'jobTitle',
  'What is your annual salary?': 'salary',
  'Please indicate the currency': 'currency',
  'Where are you located? (City/state/country)': 'location',
  'How many years of post-college professional work experience do you have?': 'workExprience',
  'If your job title needs additional context, please clarify here:': 'jobRemarks',
  'If "Other," please indicate the currency here:': 'currencyRemarks',
};
*/

// TODO: create currency type
// TODO: add currency exchange logic and compare methods
// TODO: create location type
// TODO: add geo logical info or zip code to location type

export function deserializeFromRawData(rawData: object): SurveyRecord {
  const record = new SurveyRecord();
  // XXX: can we use map to match keys?
  Object.entries(rawData).forEach((entry) => {
    const key = entry[0].trim();
    if (key === 'Timestamp') {
      record.surveyedAt = new Date(entry[1].trim()).getTime();
    } else if (key.startsWith('How old are you')) {
      try {
        record.ageRange = Range.fromString(entry[1]);
      } catch (error) {
        throw new Error('invalid age range');
      }
    } else if (key.startsWith('What industry do you work in')) {
      record.industry = entry[1].trim();
    } else if (key.startsWith('Job title')) {
      record.jobTitle = entry[1].trim();
    } else if (key.startsWith('What is your annual salary')) {
      const clean = entry[1]
        .trim()
        .replace('k', '000')
        .replace('$', '')
        .replaceAll(' ', '')
        .replaceAll(',', '');
      record.salary = Number.parseInt(clean);
    } else if (key.startsWith('Please indicate the currency')) {
      record.currency = entry[1].trim();
    } else if (key.startsWith('Where are you located')) {
      record.location = entry[1].trim();
    } else if (key.startsWith('How many years of post-college')) {
      try {
        record.workExprience = Range.fromString(entry[1]);
      } catch (error) {
        throw new Error('invalid work exprience param');
      }
    } else if (key.startsWith('If your job title needs')) {
      record.jobRemarks = entry[1].trim();
    } else if (key.startsWith('If "Other," please indicate')) {
      record.currencyRemarks = entry[1].trim();
    }
  });

  return record;
}
