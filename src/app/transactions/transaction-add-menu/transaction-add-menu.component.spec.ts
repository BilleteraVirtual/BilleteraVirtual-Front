import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionAddMenuComponent } from './transaction-add-menu.component';

describe('TransactionAddMenuComponent', () => {
  let component: TransactionAddMenuComponent;
  let fixture: ComponentFixture<TransactionAddMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionAddMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionAddMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
