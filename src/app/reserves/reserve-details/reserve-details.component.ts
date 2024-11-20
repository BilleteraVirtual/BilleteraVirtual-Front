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
  showPopup: boolean = false; // Controla si el popup está visible
  popupAction: 'extract' | 'deposit' = 'extract'; // Acción actual
  popupAmount: number = 0; // Monto ingresado en el popup

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

  // Abrir popup para extraer o depositar dinero
  openPopup(action: 'extract' | 'deposit'): void {
    this.popupAction = action;
    this.popupAmount = 0; // Reiniciar el monto
    this.showPopup = true;
  }

  // Cerrar el popup
  closePopup(): void {
    this.showPopup = false;
  }

  // Confirmar acción del popup
  confirmPopupAction(): void {
    if (this.popupAmount <= 0) {
      alert('Por favor, ingrese un monto válido.');
      return;
    }

    if (this.popupAction === 'extract') {
      this.reserveService.extractMoney(this.reserveId, this.popupAmount).subscribe({
        next: () => {
          alert('Dinero extraído exitosamente.');
          this.loadReserveDetails(); // Recargar los detalles de la reserva
          this.closePopup();
          location.reload();
        },
        error: (err) => {
          console.error('Error al extraer dinero:', err);
          alert('Hubo un error al extraer el dinero.');
        }
      });
    } else if (this.popupAction === 'deposit') {
      this.reserveService.depositMoney(this.reserveId, this.popupAmount).subscribe({
        next: () => {
          alert('Dinero ingresado exitosamente.');
          this.loadReserveDetails(); // Recargar los detalles de la reserva
          this.closePopup();
          location.reload();
        },
        error: (err) => {
          console.error('Error al ingresar dinero:', err);
          alert('Hubo un error al ingresar el dinero.');
        }
      });
    }
  }
}
