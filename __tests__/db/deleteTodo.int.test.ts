import { Todo, TodoStatus } from "@entities/Todo";
import { generateID } from "@handlers/createTodo/factory";
import DynamodbAdapter from "@utils/DynamodbAdapter";
import createTodo from "@db/createTodo";
import getTodo from "@db/getTodo";
import deleteTodo from "@db/deleteTodo";

describe("deleteTodo", () => {
  it("should delete a todo by id", async () => {
    const db = new DynamodbAdapter(process.env.region, process.env.tableName);

    const now = Date.now();
    const id = generateID(now);

    const todo: Todo = {
      id: id,
      createdAt: now,
      status: TodoStatus.Ready,
      title: "hello",
    };

    await createTodo(db, todo);
    await deleteTodo(db, id);

    const actual = await getTodo(db, id);

    expect(actual).toBe(undefined);
  });
});
