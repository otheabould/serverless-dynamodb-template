import DynamodbAdapter from "@utils/DynamodbAdapter";
import { Todo } from "@entities/Todo";

const getTodo = async (db: DynamodbAdapter, id: string): Promise<Todo> => {
  const todo = await db.get<Todo>({ id });
  return todo;
};

export default getTodo;
