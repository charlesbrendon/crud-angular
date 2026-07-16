import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CourseForm } from './courses/course-form/course-form';
import { courseResolver } from './courses/guards/course-resolver';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'courses',
    children: [
      { path: '', component: CoursesComponent },
      { path: 'new', component: CourseForm, resolve: { course: courseResolver } },  // 👈 Adicionado
      { path: 'edit/:id', component: CourseForm, resolve: { course: courseResolver } } // 👈 Adicionado
    ]
  }
];
