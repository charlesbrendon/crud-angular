import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CourseForm } from './courses/course-form/course-form';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'courses',
    children: [
      { path: '', component: CoursesComponent },
      { path: 'new', component: CourseForm },
      // 👈 ADICIONE A ROTA DE EDIÇÃO BEM AQUI:
      { path: 'edit/:id', component: CourseForm }
    ]
  }
];
