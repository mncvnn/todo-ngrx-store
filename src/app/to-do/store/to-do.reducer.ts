import TodoState, { initializeState } from './to-do.state';
import { createReducer, on, Action } from '@ngrx/store';
import * as TodoActions from './to-do.action'
import ToDo from './to-do.model';

export const initialState = initializeState();

const reducer = createReducer(
  initialState,

  on(TodoActions.GetToDoAction, state => state),

  on(TodoActions.CreateToDoAction, (state: TodoState, todo: ToDo) => {
    return { ...state, todos: [...state.todos, todo], todoError: null };
  }),

  on(TodoActions.SuccessGetToDoAction, (state: TodoState, { payload }) => {
    return { ...state, todos: payload };
  }),

  on(TodoActions.SuccessCreateToDoAction, (state: TodoState, { payload }) => {
    return { ...state, todos: [...state.todos, payload], todoError: null };
  }),

  on(TodoActions.ErrorToDoAction, (state: TodoState, error: Error) => {
    console.log('Error: ', error);
    return { ...state, todoError: error };
  })
);

export function ToDoReducer(state: TodoState | undefined, action: Action) {
  return reducer(state, action);
}