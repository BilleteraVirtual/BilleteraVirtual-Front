import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveAddComponent } from './reserve-add.component';

describe('ReserveAddComponent', () => {
  let component: ReserveAddComponent;
  let fixture: ComponentFixture<ReserveAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserveAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReserveAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
