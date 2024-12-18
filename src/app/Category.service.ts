import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  // Método para obtener todas las categorías
  getCategories(){
    return this.http.get('http://localhost:3000/categories/all');
  }
}
