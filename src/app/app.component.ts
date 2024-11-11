import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

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
  ],
})
export class AppComponent {
  title = 'billeteraVirtual';
}
