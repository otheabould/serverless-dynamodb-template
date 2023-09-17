import { Todo, TodoStatus } from "@entities/Todo";
import { generateID } from "@handlers/createTodo/factory";
import DynamodbAdapter from "@utils/DynamodbAdapter";
import createTodo from "@db/createTodo";
import getTodo from "@db/getTodo";

describe("createTodo", () => {
  it("should create and save a todo", async () => {
    const db = new DynamodbAdapter(process.env.region, process.env.tableName);

    const now = Date.now();
    const id = generateID(now);

    const todo: Todo = {
      id: id,
      createdAt: now,
      status: TodoStatus.Ready,
      title: "hello",
    };

    const actual = await createTodo(db, todo);
    const itemStoredInDB = await getTodo(db, id);

    expect(itemStoredInDB).toBeTruthy();
    expect(actual).toEqual(itemStoredInDB);
  });
});
