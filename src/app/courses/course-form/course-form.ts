import { Component, inject, signal, OnInit } from '@angular/core'; // 1. Adicione o OnInit
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router'; // 2. Importe o ActivatedRoute

import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';

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
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss'
})
export class CourseForm implements OnInit { // 3. Implemente o OnInit

  private formBuilder = inject(FormBuilder);
  private coursesService = inject(CoursesService);
  private snackBar = inject(MatSnackBar);
  private location = inject(Location);
  private route = inject(ActivatedRoute); // 4. Injete a rota ativa

  form!: FormGroup; // Mudança para inicialização tardia com "!"
  isSaving = signal<boolean>(false);

  // Retorna a mensagem de erro apropriada para cada campo do formulário
  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      // Busca o tamanho mínimo exigido dinamicamente das configurações do validador
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }

    return 'Campo inválido';
  }

  ngOnInit(): void {
    // 5. Captura o objeto "course" carregado pelo Resolver de Rotas
    const course: Course = this.route.snapshot.data['course'];

    // 6. Constrói o formulário inicializando com os dados existentes (caso seja edição)
    this.form = this.formBuilder.group({
      id: [course?.id || ''], // 👈 MUITO IMPORTANTE: O ID fica mapeado aqui (invisível na tela)
      name: [course?.name || '', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: [course?.category || '', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSaving.set(true);
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
    this.location.back();
  }

  private onError() {
    this.isSaving.set(false);
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }
}
