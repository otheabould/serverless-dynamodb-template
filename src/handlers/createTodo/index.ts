import { handlerPath } from "@utils/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "POST",
        path: "/",
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["dynamodb:PutItem", "dynamodb:UpdateItem"],
      Resource: "${param:dynamodbArn}",
    },
  ],
};
