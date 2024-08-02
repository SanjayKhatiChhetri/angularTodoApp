// src/app/components/todo-create-modal/todo-create-modal.component.ts

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-create-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ],
  template: `
    <h2 mat-dialog-title>Create New Todo</h2>
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
        (click)="onCreate()"
        [disabled]="todoForm.invalid"
      >
        Create
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
    `,
  ],
})
export class TodoCreateModalComponent {
  todoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TodoCreateModalComponent>
  ) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['OPEN', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    if (this.todoForm.valid) {
      this.dialogRef.close(this.todoForm.value);
    }
  }
}
