import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  isLandingPage: boolean = false;
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;
  userName: string = 'Usuario';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLandingPage = event.url === '/landingpage' || event.url === '/';
        this.isLoginPage = event.url === '/login';
        this.isRegisterPage = event.url === '/signup';
      }
    });
  } 

  ngOnInit(): void {
    // Inicializar el Nombre del usuario
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/landingpage']);  
  }



  login(): void {
    this.router.navigate(['/login']);
  } 

  signup(): void {
    this.router.navigate(['/signup']);
  }
}
