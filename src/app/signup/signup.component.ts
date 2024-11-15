import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterOutlet, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isCompany = false; 

  router = inject(Router);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      entity: this.fb.group({
        alias: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      }),
      userType: ['', Validators.required], // Tipo de usuario (user o company)
      user: this.fb.group({
        DNI: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),
      company: this.fb.group({
        businessName: ['', Validators.required],
        category: ['', Validators.required],
      }),
    });
  }

  onUserTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Obtener el target del evento
    const userType = selectElement.value; // Obtener el valor seleccionado
  
    this.isCompany = userType === 'company';
  
    // Limpiar validadores previos
    if (this.isCompany) {
      this.signupForm.get('user.DNI')?.clearValidators();
      this.signupForm.get('user.firstName')?.clearValidators();
      this.signupForm.get('user.lastName')?.clearValidators();
      this.signupForm.get('company.businessName')?.setValidators([Validators.required]);
      this.signupForm.get('company.category')?.setValidators([Validators.required]);
    } else {
      this.signupForm.get('company.businessName')?.clearValidators();
      this.signupForm.get('company.category')?.clearValidators();
      this.signupForm.get('user.DNI')?.setValidators([Validators.required]);
      this.signupForm.get('user.firstName')?.setValidators([Validators.required]);
      this.signupForm.get('user.lastName')?.setValidators([Validators.required]);
    }
  
    // Actualizar el estado de validación
    this.signupForm.get('user.DNI')?.updateValueAndValidity();
    this.signupForm.get('user.firstName')?.updateValueAndValidity();
    this.signupForm.get('user.lastName')?.updateValueAndValidity();
    this.signupForm.get('company.businessName')?.updateValueAndValidity();
    this.signupForm.get('company.category')?.updateValueAndValidity();
  }
  
  

  submit(): void {
    const formValue = this.signupForm.value;

    const dataToSend: any = {
      entity: {
        alias: formValue.entity.alias,
        email: formValue.entity.email,
        password: formValue.entity.password,
      },
    };
  
    if (this.isCompany) {
      dataToSend.company = {
        businessName: formValue.company.businessName,
        category: formValue.company.category,
      };
    } else {
      dataToSend.user = {
        DNI: formValue.user.DNI,
        firstName: formValue.user.firstName,
        lastName: formValue.user.lastName,
      };
    }
  
    console.log('Datos a enviar:', dataToSend);
    
    // aca va la request a la api

    this.router.navigate(['/login']);
  }
}