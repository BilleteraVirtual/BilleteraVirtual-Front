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

  constructor(private entityService: EntityService, private router: Router) {}

  submitDeposit(): void {
    if (this.amount <= 0) {
      alert('El monto debe ser mayor a 0.');
      return;
    }

    this.entityService.depositMoney(this.amount).subscribe({
      next: () => {
        alert('Depósito realizado con éxito.');
        this.router.navigate(['/home']); // Redirige a la página principal o donde desees
      },
      error: (err) => {
        console.error('Error al realizar el depósito:', err);
        alert('Hubo un problema al realizar el depósito. Por favor, inténtalo de nuevo.');
      }
    });
  }
}
