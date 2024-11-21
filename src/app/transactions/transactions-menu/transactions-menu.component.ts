import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { TransactionService } from '../../Transaction.service';
import { Transaction } from '../../Transaction';
import { TransactionComponent } from "../transaction/transaction.component"; // Asegúrate de importar el modelo
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions-menu',
  standalone: true,
  imports: [TransactionComponent, CommonModule],
  templateUrl: './transactions-menu.component.html',
  styleUrl: './transactions-menu.component.css'
})
export class TransactionsMenuComponent implements OnInit {
  transactions: Transaction[] = [];
  currentPage: number = 1;
  entityCVU: string = ''; // Aquí guardamos el CVU del usuario actual

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getDecodedToken().subscribe({
      next: (decodedToken) => {
        console.log('Decoded token:', decodedToken);
        if (decodedToken && decodedToken.result?.cvu) {
          this.entityCVU = decodedToken.result.cvu; // Extrae el CVU
          this.loadTransactions();
        } else {
          console.error('Error: No se pudo obtener el CVU del token.');
        }
      },
      error: (err) => console.error('Error al decodificar el token:', err),
    });
  }

  loadTransactions(): void {
    if (!this.entityCVU) return; // Asegurarse de tener el CVU antes de hacer la solicitud.
    this.transactionService.getTransactionsByCVU(this.entityCVU, this.currentPage).subscribe({
      next: (res) => (this.transactions = res),
      error: (err) => console.error('Error al cargar las transacciones:', err),
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.loadTransactions();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadTransactions();
    }
  }

  navigateToAddTransaction(): void {
    this.router.navigate(['/transaction/add']);
  }

  // Maneja la transacción seleccionada (emitida desde el componente hijo)
  onTransactionSelected(transaction: Transaction): void {
    this.router.navigate([`/transaction/${transaction.transactionId}`]); // Navega a los detalles de la transacción
  }
}
