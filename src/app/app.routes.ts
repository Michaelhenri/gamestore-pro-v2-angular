import { Routes } from '@angular/router';
import { GameListComponent } from './pages/home/game-list/game-list';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { GerenciarProdutos } from './pages/admin/gerenciar-produtos/gerenciar-produtos'; 

export const routes: Routes = [
  { 
    path: '', 
    component: GameListComponent 
  },
  { 
    path: 'login', 
    component: Login 
  },
  { 
    path: 'admin', 
    component: GerenciarProdutos, 
    canActivate: [authGuard]
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];