import { Injectable } from '@angular/core';
import { User } from './User';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
  })

  export class UserService {
   

    DNI: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    entityCVU: string | undefined;
    

    constructor(private http: HttpClient){}

    protected userList: User[] =  []

    getAllUser(){
      return this.http.get('http://localhost:3000/users')
    }

    getOneUser(DNI: number){  
      return this.http.get('http://localhost:3000/users/' + DNI)
    }

    deleteUser(DNI: number | undefined){
      return this.http.delete('http://localhost:3000/users/' + DNI)
    }

    addUser(body: any){
      return this.http.post('http://localhost:3000/users/add', body)
    }

    updateUser(DNI : number, body:any) {
      return this.http.put<void>( 'http://localhost:3000/users/'+ DNI, body);
    }
  }