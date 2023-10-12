import { Todo, TodoStatus } from "@entities/Todo";
import DynamodbAdapter from "@utils/DynamodbAdapter";
import updateTodo from "@db/updateTodo";
import getTodo from "@db/getTodo";
import createTestTodo from "@testHelpers/createTestTodo";

describe("updateTodo", () => {
  it("should update a todo", async () => {
    const db = new DynamodbAdapter(process.env.region, process.env.tableName);

    const todo = await createTestTodo("fake todo");
    const updateParams = {
      status: TodoStatus.Complete,
      title: "hello - updated",
    };

    await updateTodo(db, todo.id, updateParams);
    const itemStoredInDB = await getTodo(db, todo.id);

    expect(itemStoredInDB.status).toEqual(updateParams.status);
    expect(itemStoredInDB.title).toEqual(updateParams.title);
  });
});
