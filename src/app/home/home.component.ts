import { Component, inject, OnInit } from '@angular/core';
import { EntityService } from '../Entity.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Entity } from '../Entity';
import { TransactionService } from '../Transaction.service';
import { TransactionComponent } from '../transactions/transaction/transaction.component';
import { Transaction } from '../Transaction';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TransactionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  entityDetails: any;
  router = inject(Router);
  authService = inject(AuthService);
  transactionService = inject(TransactionService);
  transactions: any[] = [];
  entityCVU: string = '';
  entity: any;

  

  constructor(private entityService: EntityService) {}

  ngOnInit(): void {
    this.loadEntityDetails(); // Llamar al método cuando se inicie el componente

  }

  loadEntityDetails(): void {
    this.entityService.getEntityDetails().subscribe(
      (response) => {
        this.entityDetails = response;
        console.log('Entity details:', this.entityDetails); // Verifica que los datos estén llegando correctamente
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

  loadEntity(entityCVU: string): void {
    this.entityService.getOneEntity(entityCVU).subscribe({
      next: (entity: any) => {
        this.entity = entity;
        this.loadTransactions(); // Llamar al método para cargar las transacciones
        console.log('Entity:', this.entity);
      },
      error: (err) => console.error('Error loading entity:', err),
    });
  }

  goToReserves(): void {
    this.router.navigate(['/reserves']);
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  loadTransactions(): void {
    if (!this.entityCVU) return; // Asegurarse de tener el CVU antes de hacer la solicitud.
    this.transactionService.getTransactionsByCVU(this.entityCVU, 1).subscribe({
      next: (res) => (this.transactions = res),
      error: (err) => console.error('Error al cargar las transacciones:', err),
    });
  }

  onTransactionSelected(transaction: Transaction): void {
    this.router.navigate([`/transaction/${transaction.transactionId}`]); // Navega a los detalles de la transacción
  }
}
