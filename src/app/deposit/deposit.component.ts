import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EntityService } from '../Entity.service';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent {
  amount: number = 0;
  isProcessing: boolean = false;
  isComplete: boolean = false;

  constructor(private entityService: EntityService, private router: Router) {}

  submitDeposit(): void {
    if (this.amount <= 0) {
      alert('El monto debe ser mayor a 0.');
      return;
    }

    this.isProcessing = true; // Muestra el popup
    this.entityService.depositMoney(this.amount).subscribe({
      next: () => {
        setTimeout(() => {
          this.isComplete = true; // Cambia a estado completado
          setTimeout(() => {
            this.isProcessing = false; // Oculta el popup
            this.router.navigate(['/home']); // Redirige a home
          }, 2000); // Espera 2 segundos antes de redirigir
        }, 3000); // Simula 3 segundos de procesamiento
      },
      error: (err) => {
        this.isProcessing = false; // Oculta el popup en caso de error
        console.error('Error al realizar el depósito:', err);
        alert('Hubo un problema al realizar el depósito. Por favor, inténtalo de nuevo.');
      }
    });
  }
}