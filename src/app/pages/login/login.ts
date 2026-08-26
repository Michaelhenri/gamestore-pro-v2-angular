import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isLoginView: boolean = true;

  toggleView(event: Event) {
    event.preventDefault();
    this.isLoginView = !this.isLoginView;
  }

  onSubmit(event: Event) {
    event.preventDefault();
  }
}