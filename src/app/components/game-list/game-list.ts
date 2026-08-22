import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BannerComponent } from '../banner/banner';

interface Item {
  id: number;
  titulo: string;
  categoria: string;
  preco: number;
  descricao: string;
  imagem: string;
}

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    BannerComponent
  ],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css'
})
export class GameListComponent {
  perifericos: Item[] = [
    {
      id: 101,
      titulo: 'Headset Gamer Pro X',
      categoria: 'Periféricos',
      preco: 349.90,
      descricao: 'Som surround 7.1, isolamento acústico e microfone removível de alta definição.',
      imagem: 'assets/headset.jpg'
    },
    {
      id: 102,
      titulo: 'Mouse Gamer RGB 16000 DPI',
      categoria: 'Periféricos',
      preco: 189.90,
      descricao: 'Sensor óptico de alta precisão, pesos ajustáveis e switches mecânicos.',
      imagem: 'assets/mouse.jpg'
    },
    {
      id: 103,
      titulo: 'Teclado Mecânico Switch Blue',
      categoria: 'Periféricos',
      preco: 279.90,
      descricao: 'Layout ABNT2, iluminação em múltiplos modos e resposta tátil rápida.',
      imagem: 'assets/teclado.jpg'
    }
  ];

  jogos: Item[] = [
    {
      id: 1,
      titulo: 'Cyberpunk 2077',
      categoria: 'RPG / Ação',
      preco: 199.90,
      descricao: 'Explore a metrópole de Night City em um RPG de mundo aberto futurista.',
      imagem: 'assets/cyberpunk-2077.jpg'
    },
    {
      id: 2,
      titulo: 'Elden Ring',
      categoria: 'Soulslike',
      preco: 249.90,
      descricao: 'Um vasto mundo de fantasia sombria cheio de perigos e segredos.',
      imagem: 'assets/elden-ring.jpg'
    },
    {
      id: 3,
      titulo: 'God of War Ragnarök',
      categoria: 'Ação / Aventura',
      preco: 299.90,
      descricao: 'Embarque em uma jornada mítica com Kratos e Atreus pelos Nove Reinos.',
      imagem: 'assets/god-of-war.jpg'
    }
  ];

  adicionarAoCarrinho(item: Item) {
    console.log('Item adicionado ao carrinho:', item.titulo);
  }
}