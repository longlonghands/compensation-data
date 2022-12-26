
## Description
A simple sample solution for querying compensation data.


When we have Python and [pandas](https://pandas.pydata.org/), Nodejs doesn't seems a good fit for this kind of solutions but watever! ¯\_(ツ)_/¯

This is a REST api for compensation data.


You can call the service using a `GET` method to this url `/compensation_data` with query parameters as shown bellow:

### Filtering
- {age|exprience|salary|industry|job_title|currency|location}[{lt|lte|eq|gte|gt}]={VALUE}

### Sorting
- sort={age|industry|job_title|salary|currency|location|exprience}

### Examples
- /compensation_data?salary[gte]=12000&location=Los+Angeles&sort=salary

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


By default, the service will be ready on port 3000. loading data can take up to a second to load (depending on the hardware and the data size).


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Also, you can use the [VS Code REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) to test this service using `manual-test-client.rest` file.



_NOTE: There must be some bugs here and there. This service has not been tested thoroughly._
