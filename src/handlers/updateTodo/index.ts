import { handlerPath } from "@utils/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "PUT",
        path: "/{id}",
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["dynamodb:PutItem", "dynamodb:UpdateItem", "dynamodb:GetItem"],
      Resource: "${param:dynamodbArn}",
    },
  ],
};
