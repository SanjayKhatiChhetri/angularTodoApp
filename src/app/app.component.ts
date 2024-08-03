import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { OfflineIndicatorComponent } from './offline-indicator/offline-indicator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, OfflineIndicatorComponent],
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
    <app-offline-indicator></app-offline-indicator>
  `,
  styles: [],
})
export class AppComponent {
  title = 'todo-frontend-angular';
}
