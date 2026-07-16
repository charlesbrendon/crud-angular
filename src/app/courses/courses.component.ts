import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

import { Course } from './model/course';
import { CoursesService } from './services/courses.service';
import { CoursesListComponent } from './courses-list/courses-list'; // 👈 Importado aqui

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    CoursesListComponent // 👈 Adicionado aqui
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit, OnDestroy {
  private coursesService = inject(CoursesService);
  private destroy$ = new Subject<void>();
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  courses = signal<Course[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.courses.set([]);

    this.coursesService.list()
      .pipe(
        delay(1000),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (courses) => {
          this.courses.set(courses);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Erro:', error);
          this.errorMessage.set('Erro ao carregar cursos.');
          this.isLoading.set(false);
        }
      });
  }

  retry(): void {
    if (!this.isLoading()) {
      this.loadCourses();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    // Navega para a rota 'edit/id' de forma relativa à rota atual
    this.router.navigate(['edit', course.id], { relativeTo: this.route });
  }
}
