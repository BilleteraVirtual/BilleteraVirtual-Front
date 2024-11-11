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
  styleUrl: './login.component.css'
})
export class LoginComponent {
  entityService = inject(EntityService);
  router = inject(Router);

  applyForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  public login(formData: any) {
    this.entityService.login(formData.username, formData.password).subscribe((res: any) => {
      if (res) {
        console.log('Login successful');
      } else {
        console.log('Login failed');
      }
    });
  }
  

  public submitApplication() {
    const formData = this.applyForm.value;
    this.login(formData);
    this.router.navigate(['/home']); //deberia especificar a cual home ir?
  }

  public cancelar() {
    this.router.navigate(['/landingpage']);
  }
}
