import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './authGuard.service';
import { ReserveMenuComponent } from './reserves/reserve-menu/reserve-menu.component';
import { ReserveAddComponent } from './reserves/reserve-add/reserve-add.component';
import { ReserveDetailsComponent } from './reserves/reserve-details/reserve-details.component';
import { TransactionsMenuComponent } from './transactions/transactions-menu/transactions-menu.component';
import { TransactionAddComponent } from './transactions/transaction-add/transaction-add.component';
import { TransactionAddMenuComponent } from './transactions/transaction-add-menu/transaction-add-menu.component';
import { TransactionDetailsComponent } from './transactions/transaction-details/transaction-details.component';

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
        path: 'signup',
        component: SignupComponent,
        title: 'Sign Up'
    },
    {
        path: 'landingpage',
        component: LandingPageComponent,
        title: 'Landing Page'
    },
    {
        path: 'reserves',
        component: ReserveMenuComponent,
        title: 'Reservas',
        canActivate: [AuthGuard]
    },
    {
        path: 'reserve/add',
        component: ReserveAddComponent,
        title: 'Agregar Reserva',
        canActivate: [AuthGuard]
    },
    {
        path: 'reserve/:reserveId',
        component: ReserveDetailsComponent,
        title: 'Detalles de Reserva',
        canActivate: [AuthGuard]
    },
    {
        path: 'transactions',
        component: TransactionsMenuComponent,
        title: 'Transacciones',
        canActivate: [AuthGuard]
    },
    {
        path: 'transaction/addmenu',
        component: TransactionAddMenuComponent,
        title: 'Agregar Transaccion',
        canActivate: [AuthGuard]
    },
    {
        path: 'transaction/add',
        component: TransactionAddComponent,
        title: 'Agregar Transaccion',
        canActivate: [AuthGuard]
    },
    {
        path: 'transaction/:transactionId',
        component: TransactionDetailsComponent,
        title: 'Detalles de Transaccion',
        canActivate: [AuthGuard]
    }

];
