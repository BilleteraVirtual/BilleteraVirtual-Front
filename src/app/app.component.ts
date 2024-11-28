import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {} from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component'; 
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, 
    HomeComponent,  
    RouterOutlet,
    RouterLink,
    
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
    
    NavBarComponent,
    FooterComponent
  ],
})
export class AppComponent {
  title = 'billeteraVirtual';
}
