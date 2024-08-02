import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-todo-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>Edit Todo</h2>
    <mat-dialog-content>
      <form [formGroup]="todoForm" class="todo-form">
        <mat-form-field appearance="outline">
          <mat-label>Title</mat-label>
          <input
            matInput
            formControlName="title"
            placeholder="Enter todo title"
          />
          <mat-error *ngIf="todoForm.get('title')?.hasError('required')">
            Title is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <textarea
            matInput
            formControlName="description"
            placeholder="Enter todo description"
            rows="5"
          ></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status">
            <mat-option value="OPEN">Open</mat-option>
            <mat-option value="PROGRESS">In Progress</mat-option>
            <mat-option value="TESTING">Testing</mat-option>
            <mat-option value="DONE">Done</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button
        mat-raised-button
        color="primary"
        (click)="onSave()"
        [disabled]="todoForm.invalid"
      >
        Save
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .todo-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      mat-form-field {
        width: 100%;
      }
      textarea {
        min-height: 100px;
      }
      mat-dialog-content {
        padding-top: 20px;
        padding-bottom: 20px;
      }
      mat-dialog-actions {
        margin-bottom: 0;
        padding-bottom: 16px;
      }
    `,
  ],
})
export class TodoEditModalComponent {
  todoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TodoEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo
  ) {
    this.todoForm = this.fb.group({
      title: [data.title, Validators.required],
      description: [data.description],
      status: [data.status, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.todoForm.valid) {
      const updatedTodo = {
        ...this.data,
        ...this.todoForm.value,
      };
      this.dialogRef.close(updatedTodo);
    }
  }
}
