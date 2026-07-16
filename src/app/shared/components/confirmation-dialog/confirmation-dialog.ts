import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './confirmation-dialog.html', // ou confirmation-dialog.component.html se o CLI gerou assim
  styleUrl: './confirmation-dialog.scss'
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string // Recebe a mensagem dinâmica do pai
  ) {}

  // Fecha o modal enviando o resultado (true para confirmar, false para cancelar)
  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
