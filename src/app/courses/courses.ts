import { Component } from '@angular/core';
import { Course } from './model/course';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card'; // Adicione este
import { MatToolbarModule } from '@angular/material/toolbar'; // Adicione este

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatToolbarModule], // Adicione aqui também
  templateUrl: './courses.html',
  styleUrl: './courses.scss'
})
export class CoursesComponent {
  // Verifique se estas propriedades estão EXATAMENTE assim:
  courses: Course[] = [
    { _id: '1', name: 'Angular', category: 'front-end' }
  ];

  displayedColumns = ['name', 'category'];
}
