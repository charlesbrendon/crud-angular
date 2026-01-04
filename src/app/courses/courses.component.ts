import { Component, inject } from '@angular/core'; // Adicionado 'inject'
import { Observable } from 'rxjs';
import { Course } from './model/course';
import { CoursesService } from './services/courses.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common'; // Necessário para usar o pipe async no HTML

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatToolbarModule, CommonModule],
  templateUrl: './courses.html',
  styleUrl: './courses.scss'
})
export class CoursesComponent {

  // Usando a nova função inject() do Angular moderno
  private coursesService = inject(CoursesService);

  // O símbolo $ é uma convenção para variáveis que são Observables
  courses$: Observable<Course[]>;

  displayedColumns = ['name', 'category'];

  constructor() {
    // Inicializa a busca dos dados chamando o serviço
    this.courses$ = this.coursesService.list();
  }
}
