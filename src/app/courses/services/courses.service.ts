import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { delay, first, tap, catchError, of } from 'rxjs'; // Adicione catchError e of

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly http = inject(HttpClient);
  private readonly API = 'assets/erro.json';

  list() {
    return this.http.get<Course[]>(this.API)
      .pipe(
        first(),
        delay(1000),
        tap(courses => console.log('Dados recebidos:', courses)),
        // Se der erro, cai aqui
        catchError(error => {
          console.error('Erro ao carregar cursos:', error);
          // Retorna uma lista vazia para o spinner parar e a tabela (vazia) aparecer
          return of([]);
        })
    );
  }
}
