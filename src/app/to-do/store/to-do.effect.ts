import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import { mergeMap, map, catchError } from 'rxjs/operators';
import * as TodoActions from './to-do.action'
import ToDo from './to-do.model';
import { ToDoHttpService } from './to-do.httpservice';

@Injectable()
export class ToDoEffect {
  constructor(private todoService: ToDoHttpService, private action$: Actions) { }

  GetTodo$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(TodoActions.BeginGetToDoAction),
      mergeMap(action =>
        this.todoService.getToDos().pipe(
          map((data: ToDo[]) => {
            return TodoActions.SuccessGetToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(TodoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

  CreateTodo$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(TodoActions.BeginCreateToDoAction),
      mergeMap(action =>
        this.todoService.createToDos(action.payload).pipe(
          map((data: ToDo) => {
            return TodoActions.SuccessCreateToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(TodoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );
}