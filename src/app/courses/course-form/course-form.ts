import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common'; // Importação para usar histórico de navegação
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importe para feedback visual

import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule // Adicionado para exibir mensagens
  ],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss'
})
export class CourseForm {

  private formBuilder = inject(FormBuilder);
  private coursesService = inject(CoursesService);
  private snackBar = inject(MatSnackBar);
  private location = inject(Location); // Substitui a necessidade de rotas complexas para voltar

  form: FormGroup;

  constructor() {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  onSubmit() {
    this.coursesService.save(this.form.value)
      .subscribe({
        next: (result) => {
          this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
          this.onCancel(); // Retorna para a listagem após salvar
        },
        error: () => {
          this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
        }
      });
  }

  onCancel() {
    this.location.back(); // Volta para a tela de listagem (/courses)
  }
}
