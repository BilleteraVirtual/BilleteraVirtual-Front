import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReserveService } from '../../Reserve.service';
import { Reserve } from '../../Reserve'; // Modelo de la reserva
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserve-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserve-details.component.html',
  styleUrls: ['./reserve-details.component.css']
})
export class ReserveDetailsComponent implements OnInit {
  reserve: Reserve | null = null;
  reserveId: number = 0;
  showPopup: boolean = false; // Controla si el popup de dinero está visible
  popupAction: 'extract' | 'deposit' | 'delete' = 'extract'; // Acción actual en el popup de dinero
  popupAmount: number = 0; // Monto ingresado en el popup de dinero

  // Variables para el popup de eliminar
  showDeletePopup: boolean = false; // Controla si el popup de eliminación está visible

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

  // Función para eliminar la reserva
  deleteReserve(): void {
    this.showPopup = true; // Mostrar el pop-up de confirmación de eliminación
    this.popupAction = 'delete'; // Establecer la acción como 'delete'
  }

  // Cerrar el popup de eliminación
  closeDeletePopup(): void {
    this.showDeletePopup = false;
  }

  // Confirmar eliminación de la reserva
  confirmDelete(): void {
    this.reserveService.deleteReserve(this.reserveId).subscribe({
      next: () => {
        alert('Reserva eliminada con éxito');
        this.router.navigate(['/reserves']); // Redirigir a la lista de reservas
      },
      error: (err) => console.error('Error al eliminar la reserva:', err),
    });
    this.showDeletePopup = false; // Cerrar el popup después de eliminar
  }

  // Abrir popup para extraer o depositar dinero
  openPopup(action: 'extract' | 'deposit'): void {
    this.popupAction = action;
    this.popupAmount = 0; // Reiniciar el monto
    this.showPopup = true;
  }

  // Cerrar el popup de dinero
  closePopup(): void {
    this.showPopup = false;
  }

  // Confirmar acción del popup de dinero
 
  // Función para confirmar la eliminación desde el pop-up
  confirmPopupAction(): void {
    if (this.popupAction === 'delete') {
      // Llamamos al servicio para eliminar la reserva
      this.reserveService.deleteReserve(this.reserveId).subscribe({
        next: () => {
          alert('Reserva eliminada con éxito');
          this.router.navigate(['/reserves']); // Redirigir a la lista de reservas
        },
        error: (err) => {
          console.error('Error al eliminar la reserva:', err);
          alert('Hubo un error al eliminar la reserva.');
        }
      });
      this.closePopup(); // Cerrar el pop-up
    }
    // El resto de la lógica para extraer o depositar dinero se mantiene igual
  }
}