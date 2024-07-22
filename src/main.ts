import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
/* component */
import { TaskListComponent } from './app/task-list/task-list.component';
import { AboutComponent } from './app/about/about.component';
import { HeaderComponent } from './app/header/header.component';
import { FooterComponent } from './app/footer/footer.component';

import {
  Routes,
  provideRouter,
  RouterModule,
  withComponentInputBinding,
} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
  <app-header></app-header>
  <div class="container-fluid mt-5">
  <router-outlet></router-outlet>
  </div>
  <app-footer></app-footer>
  `,
  providers: [
    TaskListComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [RouterModule, HeaderComponent, FooterComponent],
})
export class App {
  name = 'Angular';
}

const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', redirectTo: '/tasks' }, // Handle any other route by redirecting to tasks
];

bootstrapApplication(App, {
  providers: [provideRouter(routes, withComponentInputBinding())],
});
