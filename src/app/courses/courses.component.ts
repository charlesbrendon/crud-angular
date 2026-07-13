import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // 1. Importe Router e ActivatedRoute
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

import { Course } from './model/course';
import { CoursesService } from './services/courses.service';
import { CategoryPipe } from '../shared/pipes/category-pipe'; // 👈 Importe o pipe

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    CategoryPipe, // 👈 Adicione ao array de imports
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit, OnDestroy {
  private coursesService = inject(CoursesService);
  private destroy$ = new Subject<void>();
  private router = inject(Router); // 2. Injete o Roteador
  private route = inject(ActivatedRoute); // 2. Injete a Rota Atual

  displayedColumns = ['name', 'category'];

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
        delay(1000), // Reduzido para melhor UX
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (courses) => {
          this.courses.set(courses);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Erro:', error);

          let errorMsg = 'Erro ao carregar cursos.';
          if (error.status === 0) {
            errorMsg = 'Erro de conexão. Verifique sua internet.';
          } else if (error.status === 404) {
            errorMsg = 'Serviço não encontrado.';
          } else if (error.status === 401 || error.status === 403) {
            errorMsg = 'Acesso não autorizado.';
          } else if (error.status >= 500) {
            errorMsg = 'Erro no servidor. Tente novamente mais tarde.';
          }

          this.errorMessage.set(errorMsg);
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
    console.log('Navegando para criação de curso...');
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
