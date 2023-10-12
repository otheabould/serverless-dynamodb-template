import DynamodbAdapter from "@utils/DynamodbAdapter";
import getTodo from "@db/getTodo";
import createTestTodo from "@testHelpers/createTestTodo";

describe("getTodo", () => {
  it("should get a todo by id", async () => {
    const db = new DynamodbAdapter(process.env.region, process.env.tableName);

    const todo = await createTestTodo("fake todo");
    const actual = await getTodo(db, todo.id);

    expect(actual).toEqual(todo);
  });
});
