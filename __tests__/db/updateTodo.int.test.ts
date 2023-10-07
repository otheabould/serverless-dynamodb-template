import { Todo, TodoStatus } from "@entities/Todo";
import { generateID } from "@handlers/createTodo/factory";
import DynamodbAdapter from "@utils/DynamodbAdapter";
import updateTodo from "@db/updateTodo";
import getTodo from "@db/getTodo";
import createTodo from "@db/createTodo";

describe("updateTodo", () => {
  it("should update a todo", async () => {
    const db = new DynamodbAdapter(process.env.region, process.env.tableName);

    const now = Date.now();
    const id = generateID(now);

    const todo: Todo = {
      id,
      createdAt: now,
      status: TodoStatus.Ready,
      title: "hello",
    };

    await createTodo(db, todo);

    const updateParams = {
      status: TodoStatus.Complete,
      title: "hello - updated",
    };

    await updateTodo(db, id, updateParams);
    const itemStoredInDB = await getTodo(db, id);

    expect(itemStoredInDB.status).toEqual(updateParams.status);
    expect(itemStoredInDB.title).toEqual(updateParams.title);
  });
});
