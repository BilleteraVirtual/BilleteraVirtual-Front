import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        title: 'Pagina Inicio'
    },
    { 
        path: 'login',
        component: LoginComponent,
        title: 'Log In'
    },   
];


