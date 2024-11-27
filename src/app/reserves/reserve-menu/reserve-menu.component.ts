import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReserveComponent } from "../reserve/reserve.component";
import { ReserveService } from '../../Reserve.service';
import { AuthService } from '../../auth.service'; // Importa el servicio de autenticación
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserve-menu',
  standalone: true,
  imports: [CommonModule, ReserveComponent],
  templateUrl: './reserve-menu.component.html',
  styleUrls: ['./reserve-menu.component.css']
})
export class ReserveMenuComponent implements OnInit {
  reserves: any[] = [];
  entityCVU: string = "";

  constructor(
    private reserveService: ReserveService,
    private authService: AuthService, // Inyecta el servicio
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEntityCVU();
  }

  loadEntityCVU(): void {
    this.authService.getDecodedToken().subscribe({
      next: (decodedToken) => {
        console.log('Decoded token:', decodedToken); // Muestra el token decodificado en la consola
        if (decodedToken && decodedToken.result?.cvu) {
          this.entityCVU = decodedToken.result.cvu; // Extrae el CVU
          this.loadReserves();
        } else {
          console.error('Error: No se pudo obtener el CVU del token.');
        }
      },
      error: (err) => console.error('Error al decodificar el token:', err),
    });
  }

  loadReserves(): void {
    if (!this.entityCVU) {
      console.error('Error: entityCVU is empty.');
      return;
    }
    this.reserveService.getReservesByEntity(this.entityCVU).subscribe({
      next: (res) => (this.reserves = res),
      error: (err) => console.error('Error al cargar las reservas:', err),
    });
  }

  navigateToAddReserve(): void {
    this.router.navigate(['/reserve/add']);
  }

  navigateToReserveDetails(reserveId: number): void {
    this.router.navigate([`/reserve/${reserveId}`]);
  }
}