import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);
  private router = inject(Router);

  isLoginView: boolean = true;

  // Campos de Login
  loginUsuario: string = '';
  loginSenha: string = '';

  // Campos de Cadastro
  cadUsuario: string = '';
  cadEmail: string = '';
  cadSenha: string = '';

  toggleView(event: Event) {
    event.preventDefault();
    this.isLoginView = !this.isLoginView;
  }

  onCadastrar(event: Event) {
    event.preventDefault();

    const novoUsuario = {
      nome: this.cadUsuario,
      email: this.cadEmail,
      senha: this.cadSenha,
    };

    localStorage.setItem('usuario_cadastrado', JSON.stringify(novoUsuario));
    alert('Cadastro realizado com sucesso! Faça login para continuar.');

    this.cadUsuario = '';
    this.cadEmail = '';
    this.cadSenha = '';
    this.isLoginView = true;
  }

  onLogin(event: Event) {
    event.preventDefault();

    const usuarioSalvo = localStorage.getItem('usuario_cadastrado');

    if (!usuarioSalvo) {
      alert('Nenhum usuário cadastrado até o momento!');
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    if (this.loginUsuario === usuario.nome && this.loginSenha === usuario.senha) {
      // 1. Notifica o serviço global que o usuário logou
      this.authService.fazerLogin({ nome: usuario.nome, email: usuario.email });

      alert(`Bem-vindo, ${usuario.nome}!`);

      // 2. Redireciona para a página principal (Home)
      this.router.navigate(['/']);
    } else {
      alert('Usuário ou senha incorretos!');
    }
  }
}