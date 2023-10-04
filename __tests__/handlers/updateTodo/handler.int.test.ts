import createTodo from "@db/createTodo";
import { Todo, TodoResponse, TodoStatus } from "@entities/Todo";
import { generateID } from "@handlers/createTodo/factory";
import { SchemaBody } from "@handlers/updateTodo/schema";
import DynamodbAdapter from "@utils/DynamodbAdapter";
import axios from "axios";

const baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`;

describe("updateTodo handler", () => {
  it("should successfully update a todo", async () => {
    const db = new DynamodbAdapter(process.env.region, process.env.tableName);

    const now = Date.now();
    const id = generateID(now);

    const todo: Todo = {
      id: id,
      createdAt: now,
      status: TodoStatus.Ready,
      title: "My title",
    };

    await createTodo(db, todo);

    // GIVEN
    const payload: SchemaBody = {
      title: "My title - updated",
      status: TodoStatus.Complete,
    };

    const response = await axios.put<TodoResponse>(`${baseURL}/${id}`, payload);
    const data = response.data;

    // THEN
    expect(response.status).toBe(200);

    expect(data.id).toBe(id);
    expect(data.title).toBe(payload.title);
    expect(data.status).toBe(payload.status);
  });

  it("should respond with Bad Request 400 to incorrect request", async () => {
    // GIVEN
    const now = Date.now();
    const id = generateID(now);

    const wrongPayload = {};

    // WHEN
    let actual;
    try {
      await axios.put<TodoResponse>(`${baseURL}/${id}`, wrongPayload);
    } catch (e) {
      actual = e.response;
    }

    // THEN
    expect(actual.status).toBe(400);
    expect(actual.statusText).toBe("Bad Request");
  });

  it("should respond with Not Found 404 to incorrect id", async () => {
    // GIVEN
    const now = Date.now();
    const id = generateID(now);

    const payload: SchemaBody = {
      title: "My title - updated",
      status: TodoStatus.Complete,
    };

    // WHEN
    let actual;
    try {
      const data = await axios.put<TodoResponse>(`${baseURL}/${id}`, payload);
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
