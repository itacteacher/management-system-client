import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { UserComponent } from './features/users/components/user-list/user-list.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { UserProfileComponent } from './features/users/components/user-profile/user-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
];
