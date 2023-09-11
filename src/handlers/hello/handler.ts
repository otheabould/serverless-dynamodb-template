import { middyfy } from "@utils/lambda";
import {
  apiResponses,
  ValidatedEventAPIGatewayProxyEvent,
} from "@utils/apiGateway";

import schema from "./schema";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
) => {
  return apiResponses._200({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
  });
};

export const main = middyfy(handler);
