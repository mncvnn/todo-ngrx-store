import ToDo from './to-do.model';

export default class TodoState {
  todos: Array<ToDo>;
  todoError: Error;
}

export const initializeState = () => {
  return {
    todos: Array<ToDo>(),
    todoError: null
  }
}