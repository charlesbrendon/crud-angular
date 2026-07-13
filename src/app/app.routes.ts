import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
// 1. Ajuste o import: O nome da classe mudou para CourseForm e o arquivo não tem mais .component no nome
import { CourseForm } from './courses/course-form/course-form';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'courses',
    children: [
      { path: '', component: CoursesComponent },
      // 2. Use a classe CourseForm aqui
      { path: 'new', component: CourseForm }
    ]
  }
];
