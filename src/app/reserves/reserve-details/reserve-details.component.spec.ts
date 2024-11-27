
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveDetailsComponent } from './reserve-details.component';

describe('ReserveDetailsComponent', () => {
  let component: ReserveDetailsComponent;
  let fixture: ComponentFixture<ReserveDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserveDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReserveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
