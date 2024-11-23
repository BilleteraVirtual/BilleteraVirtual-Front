import { Component } from '@angular/core';
import { EntityService } from '../../Entity.service';
import { debounceTime, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Import the 'Router' module from '@angular/router'

@Component({
  selector: 'app-transaction-add-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Add 'Router' to the imports array
  templateUrl: './transaction-add-menu.component.html',
  styleUrls: ['./transaction-add-menu.component.css']
})
export class TransactionAddMenuComponent {
  searchQuery: string = '';
  searchResult: any = null;
  searchError: string = '';
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private entityService: EntityService, private router: Router) {
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.performSearch(query);
    });
  }

  onSearchInputChange(): void {
    this.searchSubject.next(this.searchQuery); // Emitir el valor para hacer la búsqueda
  }

  performSearch(query: string): void {
    if (!query.trim()) {
      this.searchResult = null;
      this.searchError = '';
      return;
    }

    this.entityService.searchEntity(query).subscribe({
      next: (result) => {
        this.searchResult = result;
        this.searchError = '';
      },
      error: (err) => {
        this.searchResult = null;
        this.searchError = err.error.message || 'Usuario no encontrado.';
      },
    });
  }

  addTransaction(entity: any) {
    // Guardar la entidad receptora en localStorage
    localStorage.setItem('transactionRecipient', JSON.stringify(entity));

    // Redirigir a la página de agregar transacción
    this.router.navigate(['/transaction/add']);
  }
}
