import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule
  ],
  // 👇 AJUSTADO PARA SEUS ARQUIVOS:
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss'
})
export class CourseForm { // Nome da classe mantido como CourseForm

  private formBuilder = inject(FormBuilder);

  form: FormGroup;

  constructor() {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onCancel() {
    console.log('Cancelado');
  }
}
