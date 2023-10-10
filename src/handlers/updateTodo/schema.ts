import type { FromSchema } from "json-schema-to-ts";
import { TodoStatus } from "@entities/Todo";

export const schema = {
  type: "object",
  properties: {
    pathParameters: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
    body: {
      type: "object",
      properties: {
        title: { type: "string", minLength: 1 },
        status: {
          enum: [TodoStatus.Ready, TodoStatus.InProgress, TodoStatus.Complete],
        },
      },
      required: ["title", "status"],
      additionalProperties: false,
    },
  },
  required: ["pathParameters", "body"],
} as const;

export type SchemaBody = FromSchema<typeof schema.properties.body>;
