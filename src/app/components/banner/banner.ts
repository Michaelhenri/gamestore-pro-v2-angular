import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Slide {
  badge: string;
  badgeClass: string;
  titulo: string;
  destaque: string;
  descricao: string;
  botaoTexto: string;
  link: string;
  imagem: string;
}

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './banner.html',
  styleUrl: './banner.css'
})
export class BannerComponent implements OnInit, OnDestroy {
  slideAtual: number = 0;
  private autoPlayTimer: any = null;

  slides: Slide[] = [
    {
      badge: 'BEM-VINDO',
      badgeClass: 'badge-danger',
      titulo: 'GAMESTORE',
      destaque: 'PRO',
      descricao: 'A sua arena de compras definitiva. Os melhores hardwares, consoles e os jogos mais aguardados do mercado em um só lugar.',
      botaoTexto: 'EXPLORAR LOJA',
      link: '#section-vendidos',
      imagem: 'assets/banner1.PNG'
    },
    {
      badge: 'PROMOÇÃO DE INVERNO',
      badgeClass: 'badge-primary',
      titulo: 'UPGRADE SEU',
      destaque: 'SETUP',
      descricao: 'Encontre os melhores eletrônicos e acessórios com performance profissional e descontos de até 40%.',
      botaoTexto: 'VER OFERTAS',
      link: '#section-vendidos',
      imagem: 'assets/banner2.PNG'
    },
    {
      badge: 'PRÉ-VENDA DISPONÍVEL',
      badgeClass: 'badge-warning',
      titulo: 'VIVA A NOVA',
      destaque: 'ERA',
      descricao: 'Garanta já o jogo mais aguardado do ano com bônus exclusivos de pré-venda e skins lendárias inclusas.',
      botaoTexto: 'GARANTIR CÓPIA',
      link: '#section-vendidos',
      imagem: 'assets/banner3.PNG'
    }
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.iniciarAutoplay();
  }

  ngOnDestroy(): void {
    this.pararAutoplay();
  }

  iniciarAutoplay(): void {
    this.pararAutoplay();

    this.ngZone.runOutsideAngular(() => {
      this.autoPlayTimer = setInterval(() => {
        this.ngZone.run(() => {
          this.proximoSlide();
        });
      }, 5000);
    });
  }

  pararAutoplay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  proximoSlide(): void {
    this.slideAtual = (this.slideAtual + 1) % this.slides.length;
    this.cdr.detectChanges();
    this.iniciarAutoplay();
  }

  slideAnterior(): void {
    this.slideAtual = (this.slideAtual - 1 + this.slides.length) % this.slides.length;
    this.cdr.detectChanges();
    this.iniciarAutoplay();
  }

  irParaSlide(index: number): void {
    this.slideAtual = index;
    this.cdr.detectChanges();
    this.iniciarAutoplay();
  }
}