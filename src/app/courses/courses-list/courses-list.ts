import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Course } from '../model/course';
import { CategoryPipe } from '../../shared/pipes/category-pipe';



@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CategoryPipe
  ],
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.scss'
})
export class CoursesListComponent {

  // Recebe a lista do componente pai (Smart)
  @Input() courses: Course[] = [];

  // Define as colunas que a tabela renderizará
  readonly displayedColumns = ['name', 'category', 'actions'];

  // Emite o clique de adicionar para que o pai decida para onde navegar
  @Output() add = new EventEmitter<boolean>(false);

  // Adicione a saída para edição
  @Output() edit = new EventEmitter<Course>();

  // Adicione a saída para remoção
  @Output() remove = new EventEmitter<Course>();

  onAdd() {
    this.add.emit(true);
  }

  //  Adiciona o método para disparar o evento de edição
  onEdit(course: Course) {
    this.edit.emit(course);
  }

  onDelete(course: Course) {
    this.remove.emit(course);
  }
}
