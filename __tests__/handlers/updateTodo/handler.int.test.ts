import axios from "axios";

import { TodoResponse, TodoStatus } from "@entities/Todo";
import { SchemaBody } from "@handlers/updateTodo/schema";

import createTestTodo from "@testHelpers/createTestTodo";
import { API_BASE } from "@testHelpers/config";

describe("updateTodo handler", () => {
  it("should successfully update a todo", async () => {
    const todo = await createTestTodo("a title");

    // GIVEN
    const payload: SchemaBody = {
      title: "My title - updated",
      status: TodoStatus.Complete,
    };

    const response = await axios.put<TodoResponse>(
      `${API_BASE}/${todo.id}`,
      payload,
    );
    const data = response.data;

    // THEN
    expect(response.status).toBe(200);

    expect(data.id).toBe(todo.id);
    expect(data.title).toBe(payload.title);
    expect(data.status).toBe(payload.status);
  });

  it("should respond with Bad Request 400 to incorrect request", async () => {
    // GIVEN
    const id = "fake id";

    const wrongPayload = {};

    // WHEN
    let actual;
    try {
      await axios.put<TodoResponse>(`${API_BASE}/${id}`, wrongPayload);
    } catch (e) {
      actual = e.response;
    }

    // THEN
    expect(actual.status).toBe(400);
    expect(actual.statusText).toBe("Bad Request");
  });

  it("should respond with Not Found 404 to incorrect id", async () => {
    // GIVEN
    const id = "fake id";

    const payload: SchemaBody = {
      title: "My title - updated",
      status: TodoStatus.Complete,
    };

    // WHEN
    let actual;
    try {
      const data = await axios.put<TodoResponse>(`${API_BASE}/${id}`, payload);
      console.log(data.data);
    } catch (e) {
      actual = e.response;
    }

    // THEN
    expect(actual.status).toBe(404);
    expect(actual.statusText).toBe("Not Found");
    expect(actual.data.message).toBe("Todo not found.");
  });
});
