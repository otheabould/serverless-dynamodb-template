import { handlerPath } from "@utils/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "DELETE",
        path: "/{id}",
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["dynamodb:GetItem", "dynamodb:DeleteItem"],
      Resource: "${param:dynamodbArn}",
    },
  ],
};
