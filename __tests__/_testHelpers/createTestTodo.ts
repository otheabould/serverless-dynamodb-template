import { Todo, TodoStatus } from "@entities/Todo";
import { generateID } from "@handlers/createTodo/factory";
import DynamodbAdapter from "@utils/DynamodbAdapter";
import createTodo from "@db/createTodo";

const createTestTodo = async (title: string) => {
  const db = new DynamodbAdapter(process.env.region, process.env.tableName);

  const now = Date.now();
  const id = generateID(now);

  const todo: Todo = {
    id: id,
    createdAt: now,
    status: TodoStatus.Ready,
    title,
  };

  await createTodo(db, todo);
  return todo;
};

export default createTestTodo;
