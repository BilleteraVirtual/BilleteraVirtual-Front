import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EntityService } from '../Entity.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isCompany = false; 

  router = inject(Router);
  entityService = inject(EntityService);

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
    // Obtener los valores del formulario
    const formValue = this.signupForm.value;
  
    // Crear el objeto base con los campos comunes (Entity)
    let dataToSend: any = {
      alias: formValue.entity.alias,
      email: formValue.entity.email,
      password: formValue.entity.password,
    };
  
    // Añadir los campos específicos según el tipo de usuario
    if (this.isCompany) {
      dataToSend = {
        ...dataToSend,
        businessName: formValue.company.businessName,
        idCategory: formValue.company.category,
      };
    } else {
      dataToSend = {
        ...dataToSend,
        DNI: formValue.user.DNI,
        firstName: formValue.user.firstName,
        lastName: formValue.user.lastName,
      };
    }
  
    // Ahora puedes enviar `dataToSend` al backend
    this.entityService.addEntity(dataToSend).subscribe(
      (res: any) => {
        console.log('Response:', res);
        if (res && res.success) {
          console.log('Entity added successfully');
          // Redirect to the login page
          this.router.navigate(['/login']);
        } else {
          console.log('Entity not added');
          // Handle failure case here if needed
        }
      },
      (error) => {
        console.error('Error adding entity:', error);
        // Handle error case here
      }
    );
  }
}