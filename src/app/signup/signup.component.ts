import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EntityService } from '../Entity.service';
import { UserService } from '../User.service';
import { last } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterOutlet, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {

  cvuActual: string = '';

  constructor(private router:Router){

  }

  serviceEntity: EntityService = inject(EntityService );
  serviceUser: UserService = inject(UserService);
  
  applyForm = new FormGroup({
    dni: new FormControl(''),
    name: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  // Deberiamos ver como distingir entre usuario y compania
  public addEntity(formData: any){
    this.cvuActual= this.numeroRandomAux().toString();
    const body = 
    {
      CVU: this.cvuActual, // vemos como asignar el cvu mientras numero random de 22 caracteres (se puede repetir)
      alias: null, //ver como asignar un alias
      balance: 0, 
      email: formData.email,
      password: formData.password,
    }
    return this.serviceEntity.addEntity(body).subscribe()
  }

  public addUser(formData: any){
    const body = 
    {
      DNI: formData.dni,
      firstName: formData.name,
      lastName: formData.lastName, 
      entityCVU: this.cvuActual,
    }
    return this.serviceUser.addUser(body).subscribe()
  }

  public onSubmit(){
    const formData = this.applyForm.value;
    this.addEntity(formData)
    this.addUser(formData)
    this.router.navigate(['/home']);
  }
  

public numeroRandomAux(): bigint {
  const min = BigInt('1000000000000000000000');
  const max = BigInt('9999999999999999999999'); 

  const randomNumber = min + BigInt(Math.floor(Math.random() * Number(max - min + BigInt(1))));
  randomNumber

  return randomNumber;
}

}
