import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TodoCreateModalComponent } from '../todo-create-modal/todo-create-modal.component';
import { TodoService } from '../../services/todo.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    TodoCreateModalComponent,
  ],
  template: `
    <nav>
      <ng-container *ngIf="authService.isLoggedIn(); else loggedOut">
        <a routerLink="/todos">Todos</a>
        <button mat-button (click)="openCreateTodoModal()">Create Todo</button>
        <button mat-button (click)="logout()">Logout</button>
      </ng-container>
      <ng-template #loggedOut>
        <a routerLink="/login">Login</a>
        <a routerLink="/register">Register</a>
      </ng-template>
    </nav>
  `,
  styles: [
    `
      nav {
        padding: 1rem;
        background-color: #f8f9fa;
      }
      a {
        margin-right: 1rem;
        text-decoration: none;
        color: #007bff;
      }
      a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class NavComponent {
  constructor(
    public authService: AuthService,
    private dialog: MatDialog,
    private todoService: TodoService
  ) {}

  logout(): void {
    this.authService.logout();
  }

  openCreateTodoModal(): void {
    const dialogRef = this.dialog.open(TodoCreateModalComponent, {
      width: '80%',
      maxWidth: '800px',
      height: 'auto',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.todoService
          .createTodo(result.title, result.description, result.status)
          .subscribe({
            next: (response) => {
              console.log('Todo created successfully:', response);
              // You might want to refresh the todo list here or emit an event
            },
            error: (error) => {
              console.error('Error creating todo:', error);
            },
          });
      }
    });
  }
}
