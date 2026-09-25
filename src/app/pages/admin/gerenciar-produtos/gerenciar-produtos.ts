import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-gerenciar-produtos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './gerenciar-produtos.html',
  styleUrl: './gerenciar-produtos.css'
})
export class GerenciarProdutos {
  // Lista temporária em memória para montar o layout da tabela
  produtos = [
    { id: 101, titulo: 'Headset Gamer Pro X', categoria: 'Periféricos', preco: 349.90 },
    { id: 1, titulo: 'Cyberpunk 2077', categoria: 'RPG / Ação', preco: 199.90 }
  ];

  colunasTabela: string[] = ['id', 'titulo', 'categoria', 'preco', 'acoes'];

  abrirFormularioNovo(): void {
    console.log('Novo produto clicado');
  }

  editarProduto(produto: any): void {
    console.log('Editar:', produto);
  }

  excluirProduto(id: number): void {
    console.log('Excluir id:', id);
  }
}