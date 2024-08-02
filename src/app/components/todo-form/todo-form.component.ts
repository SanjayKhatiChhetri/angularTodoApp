// src/app/components/todo-form/todo-form.component.ts

import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="todo-form">
      <input
        [(ngModel)]="title"
        name="title"
        placeholder="Title"
        required
        class="form-input"
      />
      <textarea
        [(ngModel)]="description"
        name="description"
        placeholder="Description"
        class="form-input"
      ></textarea>
      <select [(ngModel)]="status" name="status" class="form-input">
        <option value="OPEN">Open</option>
        <option value="PROGRESS">In Progress</option>
        <option value="TESTING">Testing</option>
        <option value="DONE">Done</option>
      </select>
      <button type="submit" class="btn btn-primary">Add Todo</button>
    </form>
  `,
  styles: [
    `
      .todo-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;
      }
      .form-input {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      .btn-primary {
        background-color: #4caf50;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      .btn-primary:hover {
        background-color: #45a049;
      }
    `,
  ],
})
export class TodoFormComponent {
  @Output() todoAdded = new EventEmitter<any>();

  title = '';
  description = '';
  status = 'OPEN';

  constructor(private todoService: TodoService) {}

  onSubmit() {
    if (this.title.trim()) {
      this.todoService
        .createTodo(this.title, this.description, this.status)
        .subscribe({
          next: (response) => {
            this.todoAdded.emit(response.data);
            this.resetForm();
          },
          error: (error) => {
            console.error('Error creating todo:', error);
          },
        });
    }
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.status = 'OPEN';
  }
}
