import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);
  private router = inject(Router);

  isLoginView: boolean = true;

  // Campos de Login (apenas e-mail e senha)
  loginEmail: string = '';
  loginSenha: string = '';

  // Campos de Cadastro (apenas e-mail e senha)
  cadEmail: string = '';
  cadSenha: string = '';

  toggleView(event: Event) {
    event.preventDefault();
    this.isLoginView = !this.isLoginView;
  }

  onCadastrar(event: Event) {
    event.preventDefault();

    if (!this.cadEmail || !this.cadSenha) {
      alert('Preencha o e-mail e a senha para se cadastrar.');
      return;
    }

    const clientesCadastrados = JSON.parse(
      localStorage.getItem('usuarios_cadastrados') || '[]'
    );

    // Adiciona o novo cliente
    clientesCadastrados.push({
      email: this.cadEmail,
      senha: this.cadSenha,
      perfil: 'CLIENTE',
    });

    localStorage.setItem(
      'usuarios_cadastrados',
      JSON.stringify(clientesCadastrados)
    );

    alert('Cadastro realizado com sucesso! Faça login para continuar.');

    this.cadEmail = '';
    this.cadSenha = '';
    this.isLoginView = true;
  }

  onLogin(event: Event) {
    event.preventDefault();

    // Executa a autenticação validando o e-mail e senha no serviço Auth
    const sucesso = this.authService.fazerLogin(this.loginEmail, this.loginSenha);

    if (sucesso) {
      alert('Login realizado com sucesso!');

      // Redireciona o ADMIN para o painel ou CLIENTE para a home
      if (this.authService.eAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      alert('E-mail ou senha incorretos!');
    }
  }
}