import DynamodbAdapter from "@utils/DynamodbAdapter";
import { Todo, TodoStatus } from "@entities/Todo";

interface UpdateParams {
  title: string;
  status: TodoStatus;
}

const updateTodo = async (
  db: DynamodbAdapter,
  id: string,
  updateParams: UpdateParams,
): Promise<Todo> => {
  const todo = await db.update<Todo>({ id }, updateParams);
  return todo;
};

export default updateTodo;
