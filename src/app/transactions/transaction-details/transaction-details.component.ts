import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../../Transaction';
import { TransactionService } from '../../Transaction.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Entity } from '../../Entity';
import { EntityService } from '../../Entity.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent {
  transactionId: number = 0;
  transaction: any | null = null;
  entityCVU: string = ''; // Aquí guardamos el CVU del usuario actual
  entity: Entity | null = null;
  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private entityService: EntityService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el transactionId de la URL
    this.route.paramMap.subscribe((params) => {
      this.transactionId = Number(params.get('transactionId'));
      if (this.transactionId) {
        this.getTransactionDetails(this.transactionId);
      }
    });
    this.loadEntityCVU();
  }

  loadEntityCVU(): void {
    // Obtener el CVU desde el token decodificado
    this.authService.getDecodedToken().subscribe({
      next: (decodedToken) => {
        if (decodedToken && decodedToken.result?.cvu) {
          const entityCVU = decodedToken.result.cvu; // Extrae el CVU
          this.entityCVU = entityCVU; // Poblamos el campo CVU en el formulario
          this.loadEntity(); // Cargar la entidad
        } else {
          console.error('Error: No se pudo obtener el CVU del token.');
        }
      },
      error: (err) => console.error('Error al decodificar el token', err)
    });
  }

  loadEntity(): void {
    this.entityService.getOneEntity(this.entityCVU).subscribe({
      next: (entity) => {
        this.entity = entity as Entity; // Cast 'entity' to 'Entity' type
        console.log('Entidad cargada:', this.entity);
      },
      error: (err) => console.error('Error al obtener la entidad', err)
    });
  }

  // Método para obtener los detalles de la transacción
  getTransactionDetails(transactionId: number): void {
    this.transactionService.getTransactionDetails(transactionId).subscribe({
      next: (data) => {
        this.transaction = data;  // Asigna los datos de la transacción al componente
        console.log('Detalles de la transacción:', this.transaction);
      },
      error: (err) => {
        console.error('Error al obtener detalles de la transacción', err);
      }
    });
  }

  goBack(): void {
    window.history.back();
  }
}
