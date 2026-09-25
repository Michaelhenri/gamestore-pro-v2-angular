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

  // Campos de Login
  loginEmail: string = '';
  loginSenha: string = '';

  // Campos de Cadastro
  cadNome: string = '';
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

    // Chama a validação e criação centralizada no authService
    const resultado = this.authService.cadastrarUsuario({
      nome: this.cadNome,
      email: this.cadEmail,
      senha: this.cadSenha,
      perfil: 'CLIENTE',
    });

    if (!resultado.sucesso) {
      // Exibe a mensagem de e-mail duplicado/reservado sem alternar a tela
      alert(resultado.mensagem);
      return;
    }

    // Sucesso no cadastro
    alert(resultado.mensagem);

    // Limpa os campos e volta para a tela de login
    this.cadNome = '';
    this.cadEmail = '';
    this.cadSenha = '';
    this.isLoginView = true;
  }

  onLogin(event: Event) {
    event.preventDefault();

    const sucesso = this.authService.fazerLogin(this.loginEmail, this.loginSenha);

    if (sucesso) {
      alert('Login realizado com sucesso!');

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