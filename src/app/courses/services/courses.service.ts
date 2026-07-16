import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        first(),
        tap(courses => console.log(courses))
      );
  }

  // 👈 NOVO MÉTODO: Busca por ID
  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`)
      .pipe(first());
  }

  // Novo método para persistir dados
  save(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record)
      .pipe(first());
  }
}
