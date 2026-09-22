import { Injectable, signal } from '@angular/core';

export type PerfilUsuario = 'VISITANTE' | 'CLIENTE' | 'ADMIN';

export interface Usuario {
  nome?: string;
  email: string;
  senha?: string;
  perfil: PerfilUsuario;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // Inicializa o perfil e o usuário a partir do localStorage para manter o login no F5
  usuarioLogado = signal<Usuario | null>(this.obterUsuarioDoStorage());
  perfilAtual = signal<PerfilUsuario>(this.obterPerfilDoStorage());

  private obterUsuarioDoStorage(): Usuario | null {
    const dados = localStorage.getItem('usuario_sessao');
    return dados ? JSON.parse(dados) : null;
  }

  private obterPerfilDoStorage(): PerfilUsuario {
    const perfilSalvo = localStorage.getItem('perfil_usuario') as PerfilUsuario;
    return perfilSalvo ? perfilSalvo : 'VISITANTE';
  }

  // Tenta realizar o login validando Admin OU Cliente do localStorage
  fazerLogin(emailDigitado: string, senhaDigitada: string): boolean {
    // 1. USUÁRIO ADMIN PRÉ-CADASTRADO (Chave estática de testes)
    if (emailDigitado === 'admin@teste.com' && senhaDigitada === '123456') {
      const usuarioAdmin: Usuario = {
        nome: 'Administrador',
        email: 'admin@teste.com',
        perfil: 'ADMIN'
      };
      this.salvarSessao(usuarioAdmin);
      return true;
    }

    // 2. USUÁRIOS CLIENTES (Buscados dos cadastros feitos no localStorage)
    const clientesCadastrados = JSON.parse(localStorage.getItem('usuarios_cadastrados') || '[]') as Usuario[];
    
    const clienteEncontrado = clientesCadastrados.find(
      u => u.email === emailDigitado && u.senha === senhaDigitada
    );

    if (clienteEncontrado) {
      // Garante o perfil CLIENTE para cadastros normais
      clienteEncontrado.perfil = 'CLIENTE'; 
      this.salvarSessao(clienteEncontrado);
      return true;
    }

    return false; // Login inválido
  }

  // Grava a sessão e atualiza os Signals da aplicação
  private salvarSessao(usuario: Usuario) {
    const usuarioSemSenha = { ...usuario };
    delete usuarioSemSenha.senha; // Não salva a senha na sessão por segurança

    localStorage.setItem('usuario_sessao', JSON.stringify(usuarioSemSenha));
    localStorage.setItem('perfil_usuario', usuario.perfil);
    
    this.usuarioLogado.set(usuarioSemSenha);
    this.perfilAtual.set(usuario.perfil);
  }

  // Limpa a sessão
  fazerLogout() {
    localStorage.removeItem('usuario_sessao');
    localStorage.removeItem('perfil_usuario');
    this.usuarioLogado.set(null);
    this.perfilAtual.set('VISITANTE');
  }

  // Método auxiliar para o Guard
  eAdmin(): boolean {
    return this.perfilAtual() === 'ADMIN';
  }
}