import { Injectable } from '@angular/core';
import { Entity } from './Entity';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
  })

  export class EntityService {
   

    CVU: string | undefined
    alias: string | undefined;
    balance: number | undefined;
    email: string | undefined;
    password: string | undefined;
    

    constructor(private http: HttpClient){}

    protected entityList: Entity[] =  []

    getAllEntities(){
      return this.http.get('http://localhost:3000/entites')
    }

    getOneEntity(CVU: string){  
      return this.http.get('http://localhost:3000/entites/' + CVU)
    }

    deleteEntity(entityCVU: string | undefined){
      return this.http.delete('http://localhost:3000/entities/' + entityCVU)
    }

    addEntity(body: any){
      return this.http.post('http://localhost:3000/entities/add', body)
    }

    updateEntity(CVU : string, body:any) {
      return this.http.put<void>( 'http://localhost:3000/entites/'+ CVU, body);
    }

    
  
    enviar(CVU: string, alias: string, balance: number, email: string, password: string) {
        this.CVU = CVU;
        this.alias = alias;
        this.balance = balance;
        this.email = email;
        this.password = password;
    }
  }