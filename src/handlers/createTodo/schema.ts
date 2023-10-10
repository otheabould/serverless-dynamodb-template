import type { FromSchema } from "json-schema-to-ts";
import { TodoStatus } from "@entities/Todo";

export const schema = {
  type: "object",
  properties: {
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
  required: ["body"],
} as const;

export type SchemaBody = FromSchema<typeof schema.properties.body>;
