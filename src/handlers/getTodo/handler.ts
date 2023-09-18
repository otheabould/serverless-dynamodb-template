import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import middyValidator from "@middy/validator";
import middyErrorHandler from "@middy/http-error-handler";
import { transpileSchema } from "@middy/validator/transpile";

import DynamodbAdapter from "@utils/DynamodbAdapter";
import { apiResponses, ValidatedHttpApiHandler } from "@utils/apiGateway";
import { newTodoResponse } from "@entities/Todo";

import { schema } from "./schema";
import getTodo from "@db/getTodo";

const handler: ValidatedHttpApiHandler = async (event) => {
  const { id } = event.pathParameters;

  const db = new DynamodbAdapter(process.env.region, process.env.tableName);

  const todo = await getTodo(db, id);
  if (!todo) {
    return apiResponses._404("Todo not found.");
  }

  const todoResponse = newTodoResponse(todo);
  return apiResponses._200(todoResponse);
};

export const main = middy(handler)
  .use(middyJsonBodyParser())
  .use(middyValidator({ eventSchema: transpileSchema(schema) }))
  .use(middyErrorHandler());
