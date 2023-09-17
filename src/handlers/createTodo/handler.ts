import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import middyValidator from "@middy/validator";
import middyErrorHandler from "@middy/http-error-handler";
import { transpileSchema } from "@middy/validator/transpile";

import DynamodbAdapter from "@utils/DynamodbAdapter";
import { apiResponses, ValidatedHttpApiHandler } from "@utils/apiGateway";
import { newTodoResponse } from "@entities/Todo";
import createTodo from "@db/createTodo";

import { schema, SchemaBody } from "./schema";
import { newTodo } from "./factory";

const handler: ValidatedHttpApiHandler<SchemaBody> = async (event) => {
  const dynamodbAdapter = new DynamodbAdapter(
    process.env.region,
    process.env.tableName,
  );

  const todo = newTodo(event.body);
  await createTodo(dynamodbAdapter, todo);

  const todoResponse = newTodoResponse(todo);
  return apiResponses._200(todoResponse);
};

export const main = middy(handler)
  .use(middyJsonBodyParser())
  .use(middyValidator({ eventSchema: transpileSchema(schema) }))
  .use(middyErrorHandler());
