import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReserveService } from '../../Reserve.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Entity } from '../../Entity';
import { EntityService } from '../../Entity.service';

@Component({
  selector: 'app-reserve-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reserve-add.component.html',
  styleUrls: ['./reserve-add.component.css']
})
export class ReserveAddComponent implements OnInit {
  reserveForm: FormGroup;
  entityCVU: string = '';
  entity: Entity | null = null;

  constructor(
    private fb: FormBuilder,
    private reserveService: ReserveService,
    private authService: AuthService, // Inyecta el servicio
    private router: Router,
    private entityService: EntityService // Inyecta el servicio
  ) {
    // Crear formulario reactivo con validadores
    this.reserveForm = this.fb.group({
      reason: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadEntityCVU();
  }

  loadEntityCVU(): void {
    // Obtener el CVU desde el token decodificado
    this.authService.getDecodedToken().subscribe({
      next: (decodedToken) => {
        if (decodedToken && decodedToken.result?.cvu) {
          const entityCVU = decodedToken.result.cvu; // Extrae el CVU
          this.entityCVU = entityCVU; // Poblamos el campo CVU en el formulario
          this.loadEntity(); // Cargar la entidad
        } else {
          console.error('Error: No se pudo obtener el CVU del token.');
        }
      },
      error: (err) => console.error('Error al decodificar el token', err)
    });
  }

  loadEntity(): void {
    this.entityService.getOneEntity(this.entityCVU).subscribe({
      next: (entity) => {
        this.entity = entity as Entity; // Cast 'entity' to 'Entity' type
      },
      error: (err) => console.error('Error al obtener la entidad', err)
    });
  }

  // Método para guardar la nueva reserva
  onSubmit(): void {
    if (this.reserveForm.valid) {
      const newReserve = {
        ...this.reserveForm.value,
        entityCVU: this.entityCVU  // Obtenemos el CVU desde el token
      };

      this.reserveService.addReserve(newReserve).subscribe({
        next: (response) => {
          console.log('Reserva agregada exitosamente', response);
          this.router.navigate(['/reserves']); // Redirigir a la lista de reservas
        },
        error: (err) => console.error('Error al agregar la reserva', err)
      });
    } else {
      console.error('Formulario no válido');
    }
  }
}