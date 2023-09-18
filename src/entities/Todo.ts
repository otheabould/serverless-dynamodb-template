export enum TodoStatus {
  Ready = "Ready",
  InProgress = "InProgress",
  Complete = "Complete",
}

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  createdAt: number;
}

export interface TodoResponse {
  id: string;
  title: string;
  status: TodoStatus;
}

export const newTodoResponse = (todo: Todo): TodoResponse => {
  const response: TodoResponse = {
    id: todo.id,
    title: todo.title,
    status: todo.status,
  };

  return response;
};
