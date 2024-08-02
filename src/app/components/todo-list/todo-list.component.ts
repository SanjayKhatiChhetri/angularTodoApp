import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Subscription } from 'rxjs';

interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoFormComponent, TodoItemComponent], //
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  private todoSubscription: Subscription;

  constructor(private todoService: TodoService) {
    this.todoSubscription = this.todoService.todoCreated$.subscribe(() => {
      this.loadTodos();
    });
  }

  ngOnInit() {
    this.loadTodos();
  }

  ngOnDestroy() {
    if (this.todoSubscription) {
      this.todoSubscription.unsubscribe();
    }
  }

  loadTodos() {
    this.todoService.getAllTodos().subscribe({
      next: (response) => {
        this.todos = response.data;
      },
      error: (error) => {
        console.error('Error loading todos:', error);
      },
    });
  }

  updateTodoStatus(updatedTodo: Todo) {
    this.todoService
      .updateTodo(
        updatedTodo.id,
        updatedTodo.title,
        updatedTodo.description,
        updatedTodo.status
      )
      .subscribe({
        next: (response) => {
          const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
          if (index !== -1) {
            this.todos[index] = response.data;
          }
        },
        error: (error) => {
          console.error('Error updating todo:', error);
        },
      });
  }

  updateTodo(updatedTodo: Todo) {
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
    }
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
      },
    });
  }
}
