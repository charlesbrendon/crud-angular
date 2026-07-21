import { Lesson } from './lesson';

export interface Course {
  _id: number | null; // Garante o mapeamento com o @JsonProperty("_id") do Java
  name: string;
  category: string;
  lessons?: Lesson[]; // 👈 Adicionado o array opcional de aulas
}
