import DynamodbAdapter from "@utils/DynamodbAdapter";
import createTodo from "@db/createTodo";
import getTodo from "@db/getTodo";
import deleteTodo from "@db/deleteTodo";
import createTestTodo from "@testHelpers/createTestTodo";

describe("deleteTodo", () => {
  it("should delete a todo by id", async () => {
    const db = new DynamodbAdapter(process.env.region, process.env.tableName);

    const todo = await createTestTodo("fake title");

    await createTodo(db, todo);
    await deleteTodo(db, todo.id);

    const actual = await getTodo(db, todo.id);

    expect(actual).toBe(undefined);
  });
});
