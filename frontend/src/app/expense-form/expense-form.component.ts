
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-expense-form',
  imports: [],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {
  // Defina seu Reactive Form ou Template Driven Form aqui
  expenseForm: any; // Substitua por seu FormGroup

  constructor(
    public dialogRef: MatDialogRef<ExpenseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recebe os dados passados (ex: { isNew: true })
  ) {
    // Inicialização do formulário
    // Se data.isNew for false, você poderia popular o formulário para uma edição.
  }

  onCancel(): void {
    this.dialogRef.close(); // Fecha o modal sem retornar dados
  }

  onSave(): void {
    // Lógica de salvar a despesa (chamada API)
    const newExpense = { /* Dados do formulário */ };

    // Ao fechar, você passa o objeto que quer retornar para o componente pai
    this.dialogRef.close(newExpense);
  }
}
