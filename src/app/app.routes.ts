import { Routes } from '@angular/router';
import { GameListComponent } from './pages/home/game-list/game-list';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'login', component: Login }
];