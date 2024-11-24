import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reserve',
  standalone: true as const,
  imports: [],
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css'],
})
export class ReserveComponent {
  @Input() reserve: any; // Recibe los datos de una reserva
  @Output() reserveClicked = new EventEmitter<number>(); // Emite el ID de la reserva al hacer clic

  onReserveClick(): void {
    this.reserveClicked.emit(this.reserve.reserveId);
  }
}