import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importe o HttpClient
import { Course } from '../model/course';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly http = inject(HttpClient);
  // Caminho correto para quem criou public/assets/courses.json
  private readonly API = 'assets/courses.json';

  list() {
    return this.http.get<Course[]>(this.API)
      .pipe(
        first(),
        delay(1000),
        tap(courses => console.log('Dados recebidos:', courses))
    );
  }
}
