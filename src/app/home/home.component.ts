import { Component, OnInit } from '@angular/core';
import { EntityService } from '../Entity.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  entityDetails: any;

  constructor(private entityService: EntityService) {}

  ngOnInit(): void {
    this.loadEntityDetails();  // Llamar al método cuando se inicie el componente
  }

  loadEntityDetails(): void {
    this.entityService.getEntityDetails().subscribe(
      (response) => {
        this.entityDetails = response;
        console.log('Entity details:', this.entityDetails);  // Verifica que los datos estén llegando correctamente
      },
      (error) => {
        console.error('Error loading entity details:', error);
      }
    );
  }
}