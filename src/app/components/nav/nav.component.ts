// src/app/components/nav/nav.component.ts

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav>
      <ng-container *ngIf="!authService.isLoggedIn()">
        <a routerLink="/login">Login</a>
        <a routerLink="/register">Register</a>
      </ng-container>
      <ng-container *ngIf="authService.isLoggedIn()">
        <a routerLink="/todos">Todos</a>
        <a href="#" (click)="logout($event)">Logout</a>
      </ng-container>
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
  constructor(public authService: AuthService) {}

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
}
