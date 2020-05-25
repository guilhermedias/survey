# Running the tests

## Steps

Stop any running instance of the service.

```
$ npm run start:server

> survey-backend@0.1.0 start:server /Users/guilherme/Projects/Other/survey/backend
> node --no-warnings src/index.js

Survey backend listening at http://localhost:3004

<CTRL+C>

$

```

Stop any running instance of the database container.

```
$ npm run stop:db
```

Start a new instance of the database container.

```
$ npm run start:db
```

Start a new instance of the service.

```
$ npm run start:db
```

Run the test suite.

```
$ npm test
```

## Test data setup

For a test data setup reference checke [this file](https://github.com/guilhermedias/survey/blob/master/backend/scripts/database/config/setup.js).
