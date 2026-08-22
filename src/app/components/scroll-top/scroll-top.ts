import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './scroll-top.html',
  styleUrl: './scroll-top.css'
})
export class ScrollTopComponent implements OnInit, OnDestroy {
  isVisible = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    // Registra o ouvinte no document usando a fase de CAPTURA (terceiro parâmetro: true)
    // Isso intercepta o scroll de QUALQUER elemento da página antes dele ser descartado
    document.addEventListener('scroll', this.onScroll, true);
  }

  onScroll = (event: Event): void => {
    const target = event.target as HTMLElement | Document;
    let scrollTop = 0;

    if (target instanceof Document) {
      scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    } else if (target instanceof HTMLElement) {
      scrollTop = target.scrollTop;
    }

    // Altera o estado se a rolagem for maior que 200px
    const shouldShow = scrollTop > 200;

    if (this.isVisible !== shouldShow) {
      this.isVisible = shouldShow;
      // Força o Angular a atualizar a tela imediatamente
      this.cdRef.detectChanges();
    }
  };

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.scrollTo({ top: 0, behavior: 'smooth' });

    // Se a rolagem estiver em um container interno, reseta ele também
    const scrollableElements = document.querySelectorAll('*');
    scrollableElements.forEach(el => {
      if (el.scrollTop > 0) {
        el.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  ngOnDestroy() {
    // Remove o listener para evitar vazamento de memória (Memory Leak)
    document.removeEventListener('scroll', this.onScroll, true);
  }
}