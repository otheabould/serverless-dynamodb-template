import type { AWS } from "@serverless/typescript";

import createTodo from "@handlers/createTodo";

const serverlessConfiguration: AWS = {
  service: "serverless-template",
  frameworkVersion: "3",
  plugins: [
    "serverless-iam-roles-per-function",
    "serverless-esbuild",
    "serverless-export-env",
  ],

  provider: {
    name: "aws",
    stage: "${opt:stage, 'dev'}",
    runtime: "nodejs14.x",
    region: "eu-west-1",
    logRetentionInDays: 60,

    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",

      // vars for tests
      httpApiGatewayEndpointId: { Ref: "HttpApi" },
      tableName: "${param:dynamodbTable}",
      stage: "${self:provider.stage}",
      region: "${self:provider.region}",
      service: "${self:service}",
    },
  },
  // import the function via paths
  functions: { createTodo },

  params: {
    default: {
      dynamodbTable: "${self:service}-${self:provider.stage}",
      dynamodbArn: {
        "Fn::GetAtt": ["DynamoDb", "Arn"],
      },
      dynamodbStreamArn: {
        "Fn::GetAtt": ["DynamoDb", "StreamArn"],
      },
    },
  },

  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },

    "export-env": {
      filename: ".env.test",
      overwrite: true,
    },
  },

  package: {
    individually: true,
    patterns: [
      // include
      "src/**",
      // exclude
      "!*",
      "!__tests__/**",
      "!documentation/**",
      "!config/**",
      "!jestConfig/**",
    ],
  },

  resources: {
    Resources: {
      DynamoDb: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${param:dynamodbTable}",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          BillingMode: "PAY_PER_REQUEST",
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
