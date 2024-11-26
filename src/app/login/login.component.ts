import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntityService } from '../Entity.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  // Estado del modal
  showErrorModal = false;

  applyForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  public login(formData: any) {
    const body = {
      email: formData.email,
      password: formData.password
    };
  
    this.authService.login(body).subscribe(
      (res: any) => {
        if (res) {
          console.log('Login successful');
          localStorage.setItem('token', res); // Guarda el token en localStorage

          setTimeout(() => {
            this.router.navigate(['/home']); // Redirige al home
          }, 500);
        } else {
          this.showErrorModal = true; // Muestra el modal en caso de error
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.showErrorModal = true; // Muestra el modal en caso de error
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

  public closeModal() {
    this.showErrorModal = false; // Oculta el modal
  }
}
