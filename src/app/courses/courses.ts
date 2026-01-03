import { Component } from '@angular/core';
import { Course } from './model/course';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-courses',
  imports: [MatTableModule],
  templateUrl: './courses.html',
  styleUrl: './courses.scss'
})
export class CoursesComponent {
  courses: Course[] = [
    { _id: '1', name: 'Angular', category: 'front-end' }
  ];

  displayedColumns = ['name', 'category']; // Colunas que a tabela vai mostrar

  constructor() { }
}
