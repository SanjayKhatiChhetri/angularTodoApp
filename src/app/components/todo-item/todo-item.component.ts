import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TodoEditModalComponent } from '../todo-edit-modal/todo-edit-modal.component';
import { MatButtonModule } from '@angular/material/button';

interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div
      class="todo-item"
      [ngClass]="{ 'todo-completed': todo.status === 'DONE' }"
    >
      <div class="todo-content">
        <h3>{{ todo.title }}</h3>
        <p>{{ todo.description }}</p>
        <span class="todo-status">Status: {{ todo.status }}</span>
      </div>
      <div class="todo-actions">
        <button
          mat-button
          (click)="toggleStatus()"
          [ngClass]="{
            'btn-complete': todo.status !== 'DONE',
            'btn-reopen': todo.status === 'DONE'
          }"
        >
          {{ todo.status === 'DONE' ? 'Reopen' : 'Complete' }}
        </button>
        <button mat-button (click)="openEditModal()">Edit</button>
        <button mat-button color="warn" (click)="deleteTodo()">Delete</button>
      </div>
    </div>
  `,
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() todoUpdated = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<number>();
  @Output() statusChanged = new EventEmitter<Todo>();

  constructor(public dialog: MatDialog) {}

  toggleStatus(): void {
    const newStatus = this.todo.status === 'DONE' ? 'OPEN' : 'DONE';
    this.statusChanged.emit({ ...this.todo, status: newStatus });
  }

  openEditModal(): void {
    const dialogRef = this.dialog.open(TodoEditModalComponent, {
      width: '80%',
      maxWidth: '800px',
      height: 'auto',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container',
      data: { ...this.todo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.todoUpdated.emit(result);
      }
    });
  }

  deleteTodo(): void {
    this.todoDeleted.emit(this.todo.id);
  }
}
