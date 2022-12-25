import { deserializeFromRawData } from './survey-record';

test('deserilizing surver record case 1', () => {
  const record = deserializeFromRawData({
    Timestamp: '4/24/2019 11:45:20',
    'How old are you?': '65 or over',
    'What industry do you work in?': 'higher education',
    'Job title': 'Associate Professor-Librarian',
    'What is your annual salary?': '$87,000.00',
    'Please indicate the currency': 'USD',
    'Where are you located? (City/state/country)': 'Lawrenceville NJ',
    'How many years of post-college professional work experience do you have?': '21 - 30 years',
    'If your job title needs additional context, please clarify here:':
      "I'm a librarian who is tenured faculty",
    'If "Other," please indicate the currency here:': '',
  });
  expect(record.jobTitle).toBe('Associate Professor-Librarian');
  expect(record.location).toBe('Lawrenceville NJ');
  expect(record.jobRemarks).toBe("I'm a librarian who is tenured faculty");
});

test('deserilizing surver record case 2', () => {
  const record = deserializeFromRawData({
    Timestamp: '4/24/2019 11:44:57',
    'How old are you?': '45-54',
    'What industry do you work in?': 'Travel',
    'Job title': 'Senior Consultant',
    'What is your annual salary?': '85000',
    'Please indicate the currency': 'USD',
    'Where are you located? (City/state/country)': 'Suburban Chicago/IL/USA',
    'How many years of post-college professional work experience do you have?': '21 - 30 years',
    'If your job title needs additional context, please clarify here:': "I'm really a data analyst",
    'If "Other," please indicate the currency here:': '',
  });
  expect(record.industry).toBe('Travel');
  expect(record.location).toBe('Suburban Chicago/IL/USA');
  expect(record.salary).toBe(85000);
});

test('deserilizing surver record case 3', () => {
  const record = deserializeFromRawData({
    Timestamp: '4/24/2019 11:44:51',
    'How old are you?': '55-64',
    'What industry do you work in?': 'Legal',
    'Job title': 'Attorney',
    'What is your annual salary?': '125,00',
    'Please indicate the currency': 'USD',
    'Where are you located? (City/state/country)': 'Portland/OR/USA',
    'How many years of post-college professional work experience do you have?': '21 - 30 years',
    'If your job title needs additional context, please clarify here:': '',
    'If "Other," please indicate the currency here:': '',
  });
  expect(record.jobTitle).toBe('Attorney');
  expect(record.jobRemarks).toBe('');
  expect(record.salary).toBe(12500);
});

test('deserilizing surver record case 4', () => {
  const record = deserializeFromRawData({
    Timestamp: '4/24/2019 15:46:13',
    'How old are you?': '35-44',
    'What industry do you work in?': 'Land development / infrastructue',
    'Job title': 'Civil engineer',
    'What is your annual salary?': '$63k',
    'Please indicate the currency': 'AUD/NZD',
    'Where are you located? (City/state/country)': 'Auckland, NZ',
    'How many years of post-college professional work experience do you have?': '8 - 10 years',
    'If your job title needs additional context, please clarify here:': '',
    'If "Other," please indicate the currency here:': 'NZD',
  });
  expect(record.jobTitle).toBe('Civil engineer');
  expect(record.currency).toBe('AUD/NZD');
  expect(record.currencyRemarks).toBe('NZD');
  expect(record.salary).toBe(63000);
});
