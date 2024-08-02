// src/app/components/todo-list/todo-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';

interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoFormComponent, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
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

  onTodoAdded(todo: Todo) {
    this.todos.unshift(todo);
  }

  updateTodoStatus(todo: Todo) {
    const newStatus = todo.status === 'DONE' ? 'OPEN' : 'DONE';
    this.todoService
      .updateTodo(todo.id, todo.title, todo.description, newStatus)
      .subscribe({
        next: (updatedTodo) => {
          const index = this.todos.findIndex((t) => t.id === todo.id);
          if (index !== -1) {
            this.todos[index] = updatedTodo.data;
          }
        },
        error: (error) => {
          console.error('Error updating todo:', error);
        },
      });
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

  updateTodo(updatedTodo: Todo) {
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
    }
  }
}
