import { middyfy } from "@common/lambda";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@common/apiGateway";

import schema from "./schema";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
) => {
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(handler);
