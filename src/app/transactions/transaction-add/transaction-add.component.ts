import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Transaction } from '../../Transaction';
import { TransactionService } from '../../Transaction.service';
import { Entity } from '../../Entity';
import { EntityService } from '../../Entity.service';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-transaction-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './transaction-add.component.html',
  styleUrl: './transaction-add.component.css'
})
export class TransactionAddComponent implements OnInit {
  transaction: any = {
    amount: 0,
    reason: '',
    date: new Date(), // Se puede ajustar en el backend si no es necesario aquí
    idCategory: 1, // Establece una categoría predeterminada o permite seleccionar en el formulario
    senderCVU: '',
    recipientCVU: '',
  };
  entityCVU: string = ''; // Aquí guardamos el CVU del usuario actual
  recipient: any = null;
  entity: Entity | null = null;
  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private authService: AuthService,
    private entityService: EntityService
  ) {}

  ngOnInit(): void {
    // Cargar el receptor desde localStorage
    const storedRecipient = localStorage.getItem('transactionRecipient');
    if (storedRecipient) {
      this.recipient = JSON.parse(storedRecipient);
      this.transaction.recipientCVU = this.recipient.CVU;
      this.transaction.idCategory = this.recipient.idCategory;
    } else {
      console.error('No se encontró información del receptor en localStorage.');
    }
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
        if(this.entity.CVU === this.transaction.recipientCVU) {
          this.router.navigate(['/transactions']); // Redirige al listado de transacciones o donde desees
        }
        console.log('Entidad cargada:', this.entity);
      },
      error: (err) => console.error('Error al obtener la entidad', err)
    });
  }

  submitTransaction(): void {
    if (!this.entity) {
      console.error('Error: No se ha cargado la información de la entidad.');
      return;
    }
  
    if (this.transaction.amount <= 0) {
      console.error('El monto debe ser mayor a 0.');
      return;
    }
  
    if (this.transaction.amount > this.entity.balance) {
      console.error('Saldo insuficiente para realizar la transacción.');
      alert('No tienes suficiente saldo para realizar esta transacción.');
      return;
    }
  
    console.log('Transacción a enviar:', this.transaction);
    this.transactionService.createTransaction(this.transaction).subscribe({
      next: (response: any) => {
        console.log('Transacción creada exitosamente:', response);
        this.router.navigate(['/transactions']); // Redirige al listado de transacciones o donde desees
      },
      error: (err: any) => {
        console.error('Error al crear transacción:', err);
      },
    });
  }

  goBack(): void {
    localStorage.removeItem('transactionRecipient'); // Elimina la información del receptor
    this.router.navigate(['/']); // Redirige a la página inicial o donde desees
  }
}
