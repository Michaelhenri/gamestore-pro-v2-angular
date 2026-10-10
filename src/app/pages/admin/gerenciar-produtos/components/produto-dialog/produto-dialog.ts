import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProdutoService } from '../../../../../services/produto';

@Component({
  selector: 'app-produto-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './produto-dialog.html',
  styleUrl: './produto-dialog.css'
})
export class ProdutoDialog {
  produto = {
    titulo: '',
    categoria: '',
    preco: 0,
    descricao: '',
    imagem: ''
  };

  constructor(
    public dialogRef: MatDialogRef<ProdutoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private produtoService: ProdutoService
  ) {
    if (data && data.produto) {
      this.produto = { ...data.produto };
    }
  }

  salvar(): void {
    if (this.produto.titulo && this.produto.preco > 0) {
      if ((this.produto as any).id) {
        // Método PUT para atualizar
        this.produtoService.atualizar(this.produto).subscribe({
          next: (resposta: any) => {
            console.log('Produto atualizado com sucesso!', resposta);
            this.dialogRef.close(true);
          },
          error: (erro: any) => {
            console.error('Erro ao atualizar produto:', erro);
          }
        });
      } else {
        // Método POST para cadastrar
        this.produtoService.cadastrar(this.produto).subscribe({
          next: (resposta: any) => {
            console.log('Produto cadastrado com sucesso!', resposta);
            this.dialogRef.close(true);
          },
          error: (erro: any) => {
            console.error('Erro ao cadastrar produto:', erro);
          }
        });
      }
    } else {
      alert('Preencha os campos obrigatórios corretamente.');
    }
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}