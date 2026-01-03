import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses';

export const routes: Routes = [
  // Quando abrir o site, ele redireciona automaticamente para /courses
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  // Define que o endereço /courses carrega o seu novo componente
  { path: 'courses', component: CoursesComponent }
];
