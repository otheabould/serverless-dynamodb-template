import DynamodbAdapter from "@utils/DynamodbAdapter";
import { Todo } from "@entities/Todo";

const createTodo = async (db: DynamodbAdapter, todo: Todo): Promise<Todo> => {
  await db.create(todo);
  return todo;
};

export default createTodo;
