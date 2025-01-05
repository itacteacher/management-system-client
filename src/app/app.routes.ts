import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './users/user-list/user.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'user', component: UserComponent
    }
];
