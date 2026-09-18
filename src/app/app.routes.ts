import { Routes } from '@angular/router';
import { GameListComponent } from './pages/home/game-list/game-list';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { Admin } from './pages/admin/admin'; 

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
    component: Admin, 
    canActivate: [authGuard]
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];