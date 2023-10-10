import { TodoResponse } from "@entities/Todo";
import axios from "axios";
import createTestTodo from "@testHelpers/createTestTodo";

import { API_BASE } from "@testHelpers/config";

describe("getTodo handler", () => {
  it("should respond with statusCode 200 to correct request", async () => {
    const todo = await createTestTodo("a title");

    const actual = await axios.get<TodoResponse>(`${API_BASE}/${todo.id}`);
    expect(actual.status).toBe(200);
  });

  it("should respond with the correct todo", async () => {
    const todo = await createTestTodo("a title");

    const { data: actual } = await axios.get<TodoResponse>(
      `${API_BASE}/${todo.id}`,
    );

    expect(actual.title).toBe(todo.title);
    expect(actual.status).toBe(todo.status);
    expect(actual.id).toBe(todo.id);
  });

  it("should respond with Not found 404 for an incorrect id", async () => {
    let actual;
    try {
      const fakeID = "sadfasdfasdf";
      await axios.get(`${API_BASE}/${fakeID}`);
    } catch (e) {
      actual = e.response;
    }

    expect(actual.status).toBe(404);
    expect(actual.statusText).toBe("Not Found");
  });
});
