import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, 
    HomeComponent,  
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    NavBarComponent
  ],
})
export class AppComponent {
  title = 'billeteraVirtual';
}
