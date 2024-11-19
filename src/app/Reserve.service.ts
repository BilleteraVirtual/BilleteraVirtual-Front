import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReserveService {
  private apiUrl = 'http://localhost:3000'; // Cambia la URL según tu configuración

  constructor(private http: HttpClient) {}

  getReservesByEntity(entityCVU: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.apiUrl}/reserves/client/${entityCVU}`, { headers });
  }

  getReserveById(reserveId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(`${this.apiUrl}/reserves/${reserveId}`, { headers });
  }

  addReserve(reserve: { reason: string; amount: number; entityCVU: string }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<any>(`${this.apiUrl}/reserves/add`, reserve, { headers });
  }

  updateReserve(reserveId: number, amount: number, reason: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<any>(`${this.apiUrl}/reserves/update${reserveId}`, { amount, reason }, { headers });
  }

  deleteReserve(reserveId: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete<void>(`${this.apiUrl}/reserves/delete/${reserveId}`, { headers });
  }
}
