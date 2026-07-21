import { Component, inject, signal, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../services/courses.service';
import { Lesson } from '../model/lesson';
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
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss',
})
export class CourseForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  private coursesService = inject(CoursesService);
  private snackBar = inject(MatSnackBar);
  private location = inject(Location);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  isSaving = signal<boolean>(false);

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
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
    const course: Course = this.route.snapshot.data['course'];

    // 1. Inicializa o formulário contendo o FormArray de lessons
    this.form = this.formBuilder.group({
      _id: [course?._id || null], // 👈 Atualizado de 'id' para '_id' para bater com o DTO
      name: [
        course?.name || '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
      ],
      category: [course?.category || '', [Validators.required]],
      lessons: this.formBuilder.array([], Validators.required), // 👈 Inicializa o array vazio
    });

    // 2. Se o curso já tiver aulas (Edição), popula o FormArray
    if (course && course.lessons) {
      course.lessons.forEach((lesson) =>
        this.lessonsFormArray.push(this.createLessonFormGroup(lesson)),
      );
    } else {
      // Opcional: Se for um curso novo, já inicia com pelo menos uma linha de aula em branco
      this.addLesson();
    }
  }

  // 3. Getter para facilitar o acesso ao FormArray no HTML e TS
  get lessonsFormArray(): FormArray {
    return this.form.get('lessons') as FormArray;
  }

  // 4. Método auxiliar para criar o grupo de campos de uma Lesson
  private createLessonFormGroup(
    lesson: Lesson = { id: null, name: '', youtubeUrl: '' },
  ): FormGroup {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [
        lesson.name,
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
      ],
      youtubeUrl: [
        lesson.youtubeUrl,
        [Validators.required, Validators.minLength(10), Validators.maxLength(250)],
      ], // 👈 Atualizado para 250
    });
  }

  // 5. Métodos de ação para a tela adicionar/remover aulas
  addLesson(): void {
    this.lessonsFormArray.push(this.createLessonFormGroup());
  }

  removeLesson(index: number): void {
    this.lessonsFormArray.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSaving.set(true);

      // Obtém os valores do formulário
      const rawValue = this.form.value;

      // Se _id for null ou vazio, não envia o campo _id na criação
      const courseData: Partial<Course> = {
        ...(rawValue._id ? { _id: rawValue._id } : {}),
        name: rawValue.name,
        category: rawValue.category,
        lessons: rawValue.lessons,
      };

      this.coursesService.save(courseData).subscribe({
        next: () => {
          this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
          this.onCancel();
        },
        error: () => this.onError(),
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
