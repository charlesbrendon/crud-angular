import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API = 'api/courses';

  private httpClient = inject(HttpClient);

 list() {
    return this.httpClient.get<Course[]>(this.API).pipe(first());
  }

  loadById(id: number) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  // 1. Atualize o método save para ramificar entre criação e edição
 save(record: Partial<Course>) {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>) {
    // Envia um PUT para "api/courses/{id}" com as alterações
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }

  remove(_id: number) {
    return this.httpClient.delete(`${this.API}/${_id}`).pipe(first());
  }
}
