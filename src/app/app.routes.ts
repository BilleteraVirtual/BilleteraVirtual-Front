import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';


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
    { 
        path: '',
        component: SignupComponent,
        title: 'Sign Up'
    },   
];


