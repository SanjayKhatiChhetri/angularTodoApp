import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'todo-frontend-angular';
}
