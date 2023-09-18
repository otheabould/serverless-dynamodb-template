import { Todo, TodoResponse, TodoStatus } from "@entities/Todo";
import createTodo from "@db/createTodo";
import { generateID } from "@handlers/createTodo/factory";
import DynamodbAdapter from "@utils/DynamodbAdapter";
import axios from "axios";

const baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`;

describe("getTodo handler", () => {
  it("should respond with statusCode 200 to correct request", async () => {
    const db = new DynamodbAdapter(process.env.region, process.env.tableName);

    const now = Date.now();
    const id = generateID(now);

    const todo: Todo = {
      id: id,
      createdAt: now,
      status: TodoStatus.Ready,
      title: "hello",
    };

    await createTodo(db, todo);

    const actual = await axios.get<TodoResponse>(`${baseURL}/${id}`);
    expect(actual.status).toBe(200);
  });

  it("should respond with the correct todo", async () => {
    const db = new DynamodbAdapter(process.env.region, process.env.tableName);

    const now = Date.now();
    const id = generateID(now);

    const todo: Todo = {
      id: id,
      createdAt: now,
      status: TodoStatus.Ready,
      title: "hello",
    };

    await createTodo(db, todo);

    const { data: actual } = await axios.get<TodoResponse>(`${baseURL}/${id}`);

    expect(actual.title).toBe(todo.title);
    expect(actual.status).toBe(todo.status);
    expect(actual.id).toBe(todo.id);
  });

  it("should respond with Not found 404 for an incorrect id", async () => {
    let actual;
    try {
      const fakeID = "sadfasdfasdf";
      await axios.get(`${baseURL}/${fakeID}`);
    } catch (e) {
      actual = e.response;
    }

    expect(actual.status).toBe(404);
    expect(actual.statusText).toBe("Not Found");
  });
});
