import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
interface VerifyTokenResponse {
  message: string; // Add any other fields your response might have
}


@Injectable({
  providedIn: 'root'
})



export class AuthService {

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };


  constructor(private http: HttpClient, private router: Router) { }


  login(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/entities/login', body);
  }

  
  loggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token');
      if (!token) {
        resolve(false);
      }

      // Assuming you make an API call to verify token
      this.http.post<{ message: string }>('http://localhost:3000/auth/verify', { token })
        .subscribe(
          res => {
            if (res.message === 'Token verified successfully') {
              resolve(true);
            } else {
              resolve(false);
            }
          },
          error => {
            resolve(false); // In case of error, user is not logged in
          }
        );
    });
  }

  getDecodedToken(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token);  // Asegúrate de que el token esté almacenado correctamente

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any>('http://localhost:3000/auth/decode', { headers }); // Llama al endpoint para decodificar
    } else {
      console.error('No token found');
      return new Observable<any>();
    }
  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}