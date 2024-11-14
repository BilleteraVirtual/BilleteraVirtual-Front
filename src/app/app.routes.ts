import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './authGuard.service';


export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        title: 'Pagina Inicio',
        canActivate: [AuthGuard]
    },
    { 
        path: 'login',
        component: LoginComponent,
        title: 'Log In'
    },   
    { 
        path: 'register',
        component: SignupComponent,
        title: 'Sign Up'
    },   
];


