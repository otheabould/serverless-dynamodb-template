# Serverless Dynamodb Template

## Installation/deployment instructions

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx serverless deploy` to deploy this stack to AWS

## Test your service

This template contains simple CRUD lambda functions triggered by HTTP requests made on the provisioned HttpAPI.

Tests are written using `jest` framework and are divided into separate groups:
* unit
* integration

### Unit tests
These tests are to be executed locally (on developers computer or CI/CD server) and don't require access to any resources in the AWS cloud or on the Internet and are ideal to test *business logic*.
```
npm run test
```

### Integration tests
Integration tests focus on pieces of code. For example your Lambda function may read from DynamoDB, so you would write modules that would implement this functionality. Integration test would be executed against a **real** DynamoDB table provisioned during deployment of that project. However the code will be running locally (on you computer or CI/CD server).

These tests use resources in the cloud and require environment variables. To execute them you first need to *deploy* this project to AWS and then export environment variables using `npm run dotenv`.

The `serverless-export-env` plugin is used to export environment variables set for each Lambda function in the cloud. Results of that command are saved locally to the `.env.test` file. This file is later injected into `jest` context during tests.
```
npx serverless deploy
npm run dotenv
npm run int
```
