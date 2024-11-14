// login.component.ts
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntityService } from '../Entity.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corregir 'styleUrl' a 'styleUrls'
})
export class LoginComponent {
  entityService = inject(EntityService);
  router = inject(Router);

  applyForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  public login(formData: any) {
    const body = {
      "email": formData.email,
      "password": formData.password
    };
  
    this.entityService.login(body).subscribe(
      (res: any) => {
        if (res) {
          console.log('Login successful');
          localStorage.setItem('token', res); // Guarda el token en localStorage
          this.router.navigate(['/home']); // Redirige al home
        } else {
          console.log('Login failed');
        }
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }

  public submitApplication() {
    const formData = this.applyForm.value;
    this.login(formData);
  }

  public cancelar() {
    this.router.navigate(['/landingpage']);
  }
}
