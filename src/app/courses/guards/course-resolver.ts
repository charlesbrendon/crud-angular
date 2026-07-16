import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';

export const courseResolver: ResolveFn<Course> = (route, state) => {
  const service = inject(CoursesService);

  // Se a rota tiver o parâmetro "id", busca do banco de dados
  if (route.params && route.params['id']) {
    return service.loadById(route.params['id']);
  }

  // Se for uma rota de novo curso (sem id), retorna uma estrutura limpa
  return of({ id: '', name: '', category: '' });
};
