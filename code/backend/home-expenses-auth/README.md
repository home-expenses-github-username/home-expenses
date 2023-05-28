# HomeExpenses Auth Service

## Description

Authentication JWT service

## Installation

```bash
$ npm i
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## DB Migration

### Generate entity diff DB script
```bash
npm run migration:generate -- src/migration/YouSriptFile
```

### Run code DB script and commit to DB
```bash
npm run migration:run
```
