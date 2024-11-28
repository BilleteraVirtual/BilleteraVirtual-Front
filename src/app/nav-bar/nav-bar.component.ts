import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { EntityService } from '../Entity.service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  isLandingPage: boolean = false;
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;
  isHomePage: boolean = false;
  userName: string = 'Usuario';

  entityDetails: any;

  constructor(private router: Router, private entityService: EntityService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLandingPage = event.url === '/landingpage' || event.url === '/';
        this.isLoginPage = event.url === '/login';
        this.isRegisterPage = event.url === '/signup';
        this.isHomePage = event.url === '/home';
        if (this.isHomePage) {
          this.loadEntityDetails();
      }
    }});
    
  } 

  ngOnInit(): void {
    this.loadEntityDetails();
  }

  reload(){
    location.reload();
  }

  loadEntityDetails(): void {
    this.entityService.getEntityDetails().subscribe(
      (response) => {
        this.entityDetails = response;
        console.log('Entity details:', this.entityDetails);  // Verifica que los datos estén llegando correctamente
        if (this.entityDetails.firstName) {
          this.userName = this.entityDetails.firstName;
        }
        else if(this.entityDetails.businessName) {
          this.userName = this.entityDetails.businessName;
        }
      },
      (error) => {
        console.error('Error loading entity details:', error);
      }
    );
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

  backHome(): void {
    if (this.isLoginPage || this.isRegisterPage) {
    this.router.navigate(['/landingpage']);
  }else{
    this.router.navigate(['/home']);
  }
}
}
