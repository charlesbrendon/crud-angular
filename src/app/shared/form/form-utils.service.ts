import { Injectable } from '@angular/core';
import { FormArray, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  /**
   * Força a validação de todos os campos do formulário (incluindo FormArray),
   * marcando todos como 'touched' para exibir os erros de uma só vez no submit.
   */
  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormFields(control);
      }
    });
  }

  /**
   * Retorna a mensagem de erro formatada com base nas regras ativas do control.
   */
  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string): string {
    const field = formGroup.get(fieldName);
    return this.getErrorMessageFromField(field);
  }

  /**
   * Retorna a mensagem de erro para um campo específico de um FormArray pelo índice.
   */
  getFormArrayFieldErrorMessage(
    formGroup: UntypedFormGroup,
    formArrayName: string,
    fieldName: string,
    index: number
  ): string {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(fieldName);
    return this.getErrorMessageFromField(field);
  }

  /**
   * Trata o erro do campo e converte na mensagem amigável para o usuário.
   */
  getErrorMessageFromField(field: any): string {
    if (field?.hasError('required')) {
      return 'Campo obrigatório.';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors?.['minlength']['requiredLength'];
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors?.['maxlength']['requiredLength'];
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }

    return 'Campo inválido.';
  }

  /**
   * Verifica se o FormArray em si possui erros (ex: nenhuma aula adicionada) e foi tocado.
   */
  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string): boolean {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return !formArray.valid && formArray.hasError('required') && formArray.touched;
  }
}
