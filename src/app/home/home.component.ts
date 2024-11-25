import { Component, inject, OnInit } from '@angular/core';
import { EntityService } from '../Entity.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Entity } from '../Entity';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  entityDetails: any;
  router= inject(Router);
  authService = inject(AuthService);
  entityCVU: string = '';
  entity: any;
  constructor(private entityService: EntityService) {}

  ngOnInit(): void {
    this.loadEntityDetails();  // Llamar al método cuando se inicie el componente

  }

  loadEntityDetails(): void {
    this.entityService.getEntityDetails().subscribe(
      (response) => {
        this.entityDetails = response;
        console.log('Entity details:', this.entityDetails);  // Verifica que los datos estén llegando correctamente
        this.loadEntityCVU();
      },
      (error) => {
        console.error('Error loading entity details:', error);
      }
    );
  }

  loadEntityCVU(): void {
    this.authService.getDecodedToken().subscribe({
      next: (decodedToken) => {
        console.log('Decoded token:', decodedToken); // Muestra el token decodificado en la consola
        if (decodedToken && decodedToken.result?.cvu) {
          this.entityCVU = decodedToken.result.cvu; // Extrae el CVU
          this.loadEntity(this.entityCVU);
        } else {
          console.error('Error: No se pudo obtener el CVU del token.');
        }
      },
      error: (err) => console.error('Error al decodificar el token:', err),
    });
  }

  loadEntity(entityCVU: string){
    this.entityService.getOneEntity(entityCVU).subscribe({
      next: (entity: any) => { // Explicitly type 'entity' as 'any'
        this.entity = entity;
        console.log('Entity:', this.entity);
      },
      error: (err) => console.error('Error loading entity:', err),
    }
    );
  }

  goToReserves(): void {
    this.router.navigate(['/reserves']);
  }
}