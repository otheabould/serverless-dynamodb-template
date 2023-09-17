import { generateID, newTodo } from "@handlers/createTodo/factory";
import { SchemaBody } from "@handlers/createTodo/schema";
import { TodoStatus } from "@entities/Todo";

describe("factory", () => {
  describe("newTodo", () => {
    it("should map the existing fields", () => {
      const todoRequest: SchemaBody = {
        title: "hello!",
        status: TodoStatus.InProgress,
      };

      const todo = newTodo(todoRequest);

      expect(todo.title).toBe("hello!");
      expect(todo.status).toBe(TodoStatus.InProgress);
    });

    it("should correctly generate the id", () => {
      const todoRequest: SchemaBody = {
        title: "hello!",
        status: TodoStatus.InProgress,
      };

      const todo = newTodo(todoRequest);
      expect(todo.id.length).toBeGreaterThan(0);
    });

    it("should set the correct createdAt timestamp", () => {
      const todoRequest: SchemaBody = {
        title: "hello!",
        status: TodoStatus.InProgress,
      };

      const todo = newTodo(todoRequest);
      const now = Date.now();

      expect(todo.createdAt).toBeLessThanOrEqual(now);
      expect(todo.createdAt).toBeGreaterThanOrEqual(now - 20);
    });
  });

  describe("generateID", () => {
    it("should return a new id", () => {
      const now = Date.now();
      const actual = generateID(now);

      expect(actual.length).toBeGreaterThan(0);
    });

    it("should generate a random ID", () => {
      const now = Date.now();
      const id1 = generateID(now);
      const id2 = generateID(now);

      expect(id1).not.toEqual(id2);
    });
  });
});
