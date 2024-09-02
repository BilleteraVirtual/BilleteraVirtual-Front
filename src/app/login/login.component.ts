import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EntityService } from '../Entity.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterOutlet, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private router:Router){

  }

  serviceEntity: EntityService = inject(EntityService );
  
  applyForm = new FormGroup({
    dni: new FormControl(''),
    name: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  // Deberiamos ver como distingir entre usuario y compania
  public addEntity(formData: any){
    const body = 
    {
      CVU: this.numeroRandomAux(), // vemos como asignar el cvu mientras numero random de 22 caracteres (se puede repetir)
      alias: null, //ver como asignar un alias
      balance: 0, 
      email: formData.email,
      password: formData.email,
    }
    return this.serviceEntity.addEntity(body).subscribe()
  }

  public onSubmit(){
    const formData = this.applyForm.value;
    this.addEntity(formData)
    console.log(formData);
    
  }
  

  public numeroRandomAux() {
    return Math.floor(Math.random() * (1000000000000000000000 - 10000000000000000000000) + 1000000000000000000000);
  }

}
