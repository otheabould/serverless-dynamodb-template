import DynamodbAdapter from "@utils/DynamodbAdapter";
import axios from "axios";
import getTodo from "@db/getTodo";

import createTestTodo from "@testHelpers/createTestTodo";
import { API_BASE } from "@testHelpers/config";

describe("deleteTodo handler", () => {
  it("should respond with statusCode 200 to correct request", async () => {
    const todo = await createTestTodo("a title");

    const actual = await axios.delete(`${API_BASE}/${todo.id}`);
    expect(actual.status).toBe(200);
  });

  it("should successfully delete a todo", async () => {
    const db = new DynamodbAdapter(process.env.region, process.env.tableName);

    const todo = await createTestTodo("a title");
    await axios.delete(`${API_BASE}/${todo.id}`);

    const actual = await getTodo(db, todo.id);
    expect(actual).toBe(undefined);
  });

  it("should respond with Not found 404 for an incorrect id", async () => {
    let actual;
    try {
      const fakeID = "sadfasdfasdf";
      await axios.delete(`${API_BASE}/${fakeID}`);
    } catch (e) {
      actual = e.response;
    }

    expect(actual.status).toBe(404);
    expect(actual.statusText).toBe("Not Found");
  });
});
