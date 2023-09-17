import { Todo, TodoStatus, newTodoResponse } from "@entities/Todo";

describe("Todo", () => {
  describe("newTodoResponse", () => {
    it("should map the correct fields", () => {
      const todo: Todo = {
        id: "FAKE",
        title: "A title",
        status: TodoStatus.Ready,
        createdAt: Date.now(),
      };

      const response = newTodoResponse(todo);

      expect(response.id).toBe(todo.id);
      expect(response.title).toBe(todo.title);
      expect(response.status).toBe(todo.status);
    });

    it("should create a new instance", () => {
      const todo = {
        id: "FAKE",
        title: "A title",
        status: TodoStatus.Ready,
        createdAt: Date.now(),
      };

      const actual = newTodoResponse(todo);
      expect(actual).not.toBe(todo);
    });
  });
});
