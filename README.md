# House of Games App

## Heroku API link

https://house-of-games-app.herokuapp.com/

## House of Games

This project is an API built for the purpose of accessing application data programmatically. It mimics a real world backend service providing an interface that allows a front end architecture to interact with the data stored in a relational PSQL database.

## Setup

1. Fork this repository to your own GitHub account

2. Clone your fork of this repository to your local machine and `cd` into it:

```
$ git clone <your fork's URL>
$ cd fun-katas
```

## Dependencies

install dependencies using the CLI.

```
$ npm i
```

## Environment variables

Create two files .env.test and .env.development to set the environment variables for your database name.

.env.test

```
PGDATABASE=<your_database_name>_test
```

.env.development

```
PGDATBASE=<your_database_name>
```

## Seeding

Now you will need to seed your database. To seed the database you will need to run the seed script.

```
$ npm run seed
```

## Testing

To run tests run the test script. This will seed your database with test data and run the test suite with jest.

```
$ npm run test
```

To run the tests individually use the CLI command.

```
$ npm t <target_test_file>
```

## Requires

```
postgresSQL 12.7
node v15.14.0
```
