import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveMenuComponent } from './reserve-menu.component';

describe('ReserveMenuComponent', () => {
  let component: ReserveMenuComponent;
  let fixture: ComponentFixture<ReserveMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserveMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReserveMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});