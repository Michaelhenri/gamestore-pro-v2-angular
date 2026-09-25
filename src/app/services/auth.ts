import { Injectable, signal } from '@angular/core';

export type PerfilUsuario = 'VISITANTE' | 'CLIENTE' | 'ADMIN';

export interface Usuario {
  nome: string;
  email: string;
  senha?: string;
  perfil: PerfilUsuario;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
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

  // CADASTRO COM VALIDAÇÃO DE E-MAIL ÚNICO
  cadastrarUsuario(novoUsuario: Usuario): { sucesso: boolean; mensagem: string } {
    // 1. Bloqueia tentativa de cadastrar com o e-mail reservado do admin
    if (novoUsuario.email.toLowerCase() === 'admin@teste.com') {
      return {
        sucesso: false,
        mensagem: 'Este e-mail é reservado ao sistema.'
      };
    }

    // 2. Busca todos os cadastros existentes nas duas chaves
    const cadastrosChave1 = JSON.parse(localStorage.getItem('usuarios_cadastrados') || '[]');
    const cadastrosChave2 = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const clientesCadastrados: Usuario[] = [...cadastrosChave1, ...cadastrosChave2];

    // 3. Verifica se o e-mail já existe (ignora maiúsculas/minúsculas)
    const emailExiste = clientesCadastrados.some(
      u => u.email.toLowerCase() === novoUsuario.email.toLowerCase()
    );

    if (emailExiste) {
      return {
        sucesso: false,
        mensagem: 'Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.'
      };
    }

    // 4. Se o e-mail for inédito, força o perfil para CLIENTE e salva na chave principal
    novoUsuario.perfil = 'CLIENTE';
    cadastrosChave1.push(novoUsuario);
    localStorage.setItem('usuarios_cadastrados', JSON.stringify(cadastrosChave1));

    return {
      sucesso: true,
      mensagem: 'Cadastro realizado com sucesso!'
    };
  }

  fazerLogin(emailDigitado: string, senhaDigitada: string): boolean {
    // 1. ADMIN PRÉ-CADASTRADO
    if (emailDigitado === 'admin@teste.com' && senhaDigitada === '123456') {
      const usuarioAdmin: Usuario = {
        nome: 'Administrador',
        email: 'admin@teste.com',
        perfil: 'ADMIN'
      };
      this.salvarSessao(usuarioAdmin);
      return true;
    }

    // 2. CLIENTES (Verifica as duas chaves possíveis de cadastro)
    const cadastrosChave1 = JSON.parse(localStorage.getItem('usuarios_cadastrados') || '[]');
    const cadastrosChave2 = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const clientesCadastrados: Usuario[] = [...cadastrosChave1, ...cadastrosChave2];
    
    const clienteEncontrado = clientesCadastrados.find(
      u => u.email === emailDigitado && u.senha === senhaDigitada
    );

    if (clienteEncontrado) {
      clienteEncontrado.perfil = 'CLIENTE'; 
      this.salvarSessao(clienteEncontrado);
      return true;
    }

    return false;
  }

  private salvarSessao(usuario: Usuario) {
    const usuarioSemSenha = { ...usuario };
    delete usuarioSemSenha.senha;

    localStorage.setItem('usuario_sessao', JSON.stringify(usuarioSemSenha));
    localStorage.setItem('perfil_usuario', usuario.perfil);
    
    this.usuarioLogado.set(usuarioSemSenha);
    this.perfilAtual.set(usuario.perfil);
  }

  fazerLogout() {
    localStorage.removeItem('usuario_sessao');
    localStorage.removeItem('perfil_usuario');
    this.usuarioLogado.set(null);
    this.perfilAtual.set('VISITANTE');
  }

  eAdmin(): boolean {
    return this.perfilAtual() === 'ADMIN';
  }

  get primeiroNome(): string {
    const usuario = this.usuarioLogado();
    if (!usuario || !usuario.nome) return '';
    return usuario.nome.trim().split(' ')[0];
  }
}