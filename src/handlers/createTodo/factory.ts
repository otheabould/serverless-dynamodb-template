import KSUID from "ksuid";
import crypto from "crypto";

import { Todo } from "@entities/Todo";
import { SchemaBody } from "./schema";

export const newTodo = (requestBody: SchemaBody): Todo => {
  const now = Date.now();

  const todo: Todo = {
    title: requestBody.title,
    status: requestBody.status,
    createdAt: now,
    id: generateID(now),
  };

  return todo;
};

export const generateID = (createdAt: number) => {
  const payload = crypto.randomBytes(16);
  return KSUID.fromParts(createdAt, payload).string;
};
