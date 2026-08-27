import { Injectable, signal } from '@angular/core';

export interface Usuario {
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // Signal que guarda o estado do usuário (inicia buscando do localStorage)
  usuarioLogado = signal<Usuario | null>(this.obterUsuarioDoStorage());

  // Tenta ler se já existe uma sessão salva ao abrir a página
  private obterUsuarioDoStorage(): Usuario | null {
    const dados = localStorage.getItem('usuario_sessao');
    return dados ? JSON.parse(dados) : null;
  }

  // Registra o login e avisa a aplicação inteira
  fazerLogin(usuario: Usuario) {
    localStorage.setItem('usuario_sessao', JSON.stringify(usuario));
    this.usuarioLogado.set(usuario);
  }

  // Registra o logout e limpa os dados
  fazerLogout() {
    localStorage.removeItem('usuario_sessao');
    this.usuarioLogado.set(null);
  }
}