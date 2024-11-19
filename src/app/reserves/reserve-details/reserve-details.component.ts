import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReserveService } from '../../Reserve.service';
import { Reserve } from '../../Reserve';  // Importa el modelo de la reserva
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserve-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reserve-details.component.html',
  styleUrls: ['./reserve-details.component.css']
})
export class ReserveDetailsComponent implements OnInit {
  reserve: Reserve | null = null;
  reserveId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private reserveService: ReserveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la reserva desde la URL
    this.route.paramMap.subscribe(params => {
      this.reserveId = +params.get('reserveId')!; // Convertir el valor a número
      this.loadReserveDetails();
    });
  }

  loadReserveDetails(): void {
    this.reserveService.getReserveById(this.reserveId).subscribe({
      next: (res) => {
        this.reserve = res;
      },
      error: (err) => console.error('Error al cargar los detalles de la reserva:', err),
    });
  }

  // Función para redirigir a la pantalla de editar
  navigateToEditReserve(): void {
    this.router.navigate([`/reserve/edit/${this.reserveId}`]);
  }

  // Función para eliminar la reserva
  deleteReserve(): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
      this.reserveService.deleteReserve(this.reserveId).subscribe({
        next: () => {
          alert('Reserva eliminada con éxito');
          this.router.navigate(['/reserves']); // Redirigir a la lista de reservas
        },
        error: (err) => console.error('Error al eliminar la reserva:', err),
      });
    }
  }
}
