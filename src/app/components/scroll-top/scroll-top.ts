import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  imports: [],
  templateUrl: './scroll-top.html',
  styleUrl: './scroll-top.css'
})
export class ScrollTop {
  visivel = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    // Mostra o botão apenas se rolar mais de 300px para baixo
    this.visivel = window.scrollY > 300;
  }

  voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}