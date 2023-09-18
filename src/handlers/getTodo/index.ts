import { handlerPath } from "@utils/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "GET",
        path: "/{id}",
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["dynamodb:GetItem"],
      Resource: "${param:dynamodbArn}",
    },
  ],
};
