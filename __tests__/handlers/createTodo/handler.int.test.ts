import axios from "axios";

import { TodoResponse, TodoStatus } from "@entities/Todo";
import { SchemaBody } from "@handlers/createTodo/schema";
import { API_BASE } from "@testHelpers/config";

describe("createTodo handler", () => {
  it("should respond with statusCode 200 to correct request", async () => {
    // GIVEN
    const payload: SchemaBody = {
      title: "My title",
      status: TodoStatus.InProgress,
    };
    // WHEN
    const actual = await axios.post(`${API_BASE}`, payload);

    // THEN
    expect(actual.status).toBe(200);
  });

  it("should respond with created todo", async () => {
    // GIVEN
    const payload: SchemaBody = {
      title: "My title",
      status: TodoStatus.InProgress,
    };
    // WHEN
    const response = await axios.post<TodoResponse>(`${API_BASE}`, payload);
    const actual = response.data;

    // THEN
    expect(actual.title).toBe(payload.title);
    expect(actual.status).toBe(payload.status);
    expect(actual.id).toBeTruthy();
  });

  it("should respond with Bad Request 400 to incorrect request", async () => {
    // GIVEN
    const wrongPayload = {};

    // WHEN
    let actual;
    try {
      await axios.post(`${API_BASE}`, wrongPayload);
    } catch (e) {
      actual = e.response;
    }

    // THEN
    expect(actual.status).toBe(400);
    expect(actual.statusText).toBe("Bad Request");
  });
});
