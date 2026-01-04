import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { delay, first, of, tap } from 'rxjs'; // Bibliotecas RxJS necessárias

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  list() {
    return of<Course[]>([
      { _id: '1', name: 'Angular', category: 'front-end' }
    ]).pipe(
      first(), // Pega a primeira resposta e fecha a conexão
      delay(1000), // Simula um atraso de 1 segundo de rede para testarmos o Spinner depois
      tap(courses => console.log(courses)) // Log para debug no terminal do navegador
    );
  }
}
