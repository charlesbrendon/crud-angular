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
import { FormUtilsService } from '../../shared/form/form-utils.service';

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

  // Injetando a classe utilitária pública para usar direto no HTML
  public formUtils = inject(FormUtilsService);

  form!: FormGroup;
  isSaving = signal<boolean>(false);

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.retrieveLessons(course), Validators.required)
    });
  }

  private retrieveLessons(course: Course): FormGroup[] {
    const lessons: FormGroup[] = [];
    if (course?.lessons?.length) {
      course.lessons.forEach(lesson => lessons.push(this.createLessonFormGroup(lesson)));
    } else {
      lessons.push(this.createLessonFormGroup());
    }
    return lessons;
  }

  private createLessonFormGroup(lesson: Lesson = { id: null, name: '', youtubeUrl: '' }): FormGroup {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required, Validators.minLength(10), Validators.maxLength(250)]]
    });
  }

  get lessonsFormArray(): FormArray {
    return this.form.get('lessons') as FormArray;
  }

  addLesson(): void {
    this.lessonsFormArray.push(this.createLessonFormGroup());
  }

  removeLesson(index: number): void {
    this.lessonsFormArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isSaving.set(true);
      const rawValue = this.form.value;

      const courseData: Partial<Course> = {
        ...(rawValue._id ? { _id: rawValue._id } : {}),
        name: rawValue.name,
        category: rawValue.category,
        lessons: rawValue.lessons || []
      };

      this.coursesService.save(courseData).subscribe({
        next: () => {
          this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
          this.onCancel();
        },
        error: () => {
          this.isSaving.set(false);
          this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
        }
      });
    } else {
      // 👈 Se o formulário for inválido no clique do "Salvar", marca todos os campos para exibir os erros em vermelho!
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  onCancel(): void {
    this.location.back();
  }
}
