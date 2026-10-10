import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProdutoService } from '../../../services/produto';
import { ProdutoDialog } from './components/produto-dialog/produto-dialog';

@Component({
  selector: 'app-gerenciar-produtos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule
  ],
  templateUrl: './gerenciar-produtos.html',
  styleUrl: './gerenciar-produtos.css'
})
export class GerenciarProdutos implements OnInit {
  produtos: any[] = [];
  colunasTabela: string[] = ['id', 'titulo', 'categoria', 'preco', 'acoes'];

  constructor(
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.listar().subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos da API:', erro);
      }
    });
  }

  abrirFormularioNovo(): void {
    const dialogRef = this.dialog.open(ProdutoDialog, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarProdutos(); // Recarrega a tabela automaticamente após cadastrar
      }
    });
  }

  editarProduto(produto: any): void {
    const dialogRef = this.dialog.open(ProdutoDialog, {
      width: '450px',
      data: { produto: produto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarProdutos(); // Recarrega a tabela após salvar a edição
      }
    });
  }

  excluirProduto(id: string): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.deletar(id).subscribe({
        next: () => {
          this.carregarProdutos();
        },
        error: (erro) => {
          console.error('Erro ao excluir produto:', erro);
        }
      });
    }
  }
}