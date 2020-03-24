import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import ToDo from '../store/to-do.model';
import TodoState from '../store/to-do.state';
import * as TodoActions from '../store/to-do.action'

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  todo$: Observable<TodoState>;
  toDoSubscription: Subscription;
  toDoList: ToDo[] = [];
  toDoError: Error = null;

  title: string = '';
  completed: boolean = false;

  constructor(private store: Store<{ todos: TodoState }>) {
    this.todo$ = store.pipe(select('todos'));
  }

  ngOnInit(): void {
    this.toDoSubscription = this.todo$
      .pipe(
        map((x: TodoState) => {
          this.toDoList = x.todos;
          this.toDoError = x.todoError;
        })
      )
      .subscribe();

    this.store.dispatch(TodoActions.BeginGetToDoAction());
  }

  ngOnDestroy() {
    if (this.toDoSubscription) {
      this.toDoSubscription.unsubscribe();
    }
  }

  createToDo() {
    const todo: ToDo = { title: this.title, completed: this.completed };
    this.store.dispatch(TodoActions.BeginCreateToDoAction({ payload: todo }));
    this.title = '';
    this.completed = false;
  }

}
