import { middyfy } from "@common/lambda";
import {
  apiResponses,
  ValidatedEventAPIGatewayProxyEvent,
} from "@common/apiGateway";

import schema from "./schema";
const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
) => {
  return apiResponses._200({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(handler);
