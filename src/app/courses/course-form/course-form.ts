import { Component, inject, signal } from '@angular/core'; //  Adicione o "signal"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location, CommonModule } from '@angular/common'; // Importação para usar histórico de navegação
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importe para feedback visual
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; //  Importe o Progress Spinner

import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule, // Adicionado para exibir mensagens
    MatProgressSpinnerModule // Adicionado para exibir o spinner de carregamento (array de imports)
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

  // Crie o signal para controlar o estado de salvamento
  isSaving = signal<boolean>(false);

  constructor() {
//  Adicione validações aos campos
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSaving.set(true); //  Ative o modo "salvando..."
      this.coursesService.save(this.form.value)
        .subscribe({
          next: (result) => {
            this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
            this.onCancel();
          },
          error: () => this.onError()
        });
    }
  }

  onCancel() {
    this.location.back(); // Volta para a tela de listagem (/courses)
  }


// Tratamento de erro isolado como boa prática
  private onError() {
    this.isSaving.set(false); //  Desative em caso de erro para permitir tentar novamente
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }
}

