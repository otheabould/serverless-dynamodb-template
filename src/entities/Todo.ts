import type { FromSchema } from "json-schema-to-ts";

export enum TodoStatus {
  Ready = "Ready",
  InProgress = "InProgress",
  Complete = "Complete",
}

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  createdAt: number;
}

export const todoResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    name: { type: "string" },
    status: {
      enum: [TodoStatus.Ready, TodoStatus.InProgress, TodoStatus.Complete],
    },
  },
  required: ["id", "title", "status"],
  additionalProperties: false,
} as const;

export type TodoResponse = FromSchema<typeof todoResponseSchema>;

export const newTodoResponse = (todo: Todo): TodoResponse => {
  const response: TodoResponse = {
    id: todo.id,
    title: todo.title,
    status: todo.status,
  };

  return response;
};
