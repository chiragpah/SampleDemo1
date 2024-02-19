import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestCardComponent } from './pending-request-card.component';

describe('PendingRequestCardComponent', () => {
  let component: PendingRequestCardComponent;
  let fixture: ComponentFixture<PendingRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingRequestCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
