import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './Transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) {}

  getTransactionsByCVU(cvu: string, page: number = 1): Observable<Transaction[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>('http://localhost:3000/transactions/'+ cvu + '/'+page, {headers});
  }

  getTransactionDetails(transactionId: number): Observable<Transaction> {
    return this.http.get<any>(`${this.baseUrl}/${transactionId}`);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<any>(`${this.baseUrl}`, transaction);
  }
}
