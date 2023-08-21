
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@common/apiGateway';
import { middyfy } from '@common/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
