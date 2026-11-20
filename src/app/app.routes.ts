import { Routes } from '@angular/router';
import { CardDetail } from './card-detail/card-detail';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'card/:id', component: CardDetail },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: '/' },
];
