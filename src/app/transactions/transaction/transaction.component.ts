import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../../Transaction';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {
  @Input() transaction!: Transaction; // Recibe una transacción como entrada
  @Input() currentUserCVU!: string; // Recibe el CVU del usuario actual
  @Output() transactionSelected: EventEmitter<Transaction> = new EventEmitter<Transaction>(); // Emite la transacción seleccionada

  constructor() {}

  ngOnInit(): void {
    // Aquí podrías realizar algún procesamiento adicional si es necesario
  }

  // Emitir la transacción cuando se haga clic en ella
  onTransactionClick(): void {
    this.transactionSelected.emit(this.transaction); // Emitimos la transacción seleccionada
  }

  // Establece el color y el signo dependiendo de si el usuario es el emisor o receptor
  getTransactionStyle(): string {
    if (this.transaction.senderCVU === this.currentUserCVU) {
      return 'transaction-sender'; // Estilo para el emisor (rojo)
    } else if (this.transaction.recipientCVU === this.currentUserCVU) {
      return 'transaction-recipient'; // Estilo para el receptor (verde)
    }
    return '';
  }
}