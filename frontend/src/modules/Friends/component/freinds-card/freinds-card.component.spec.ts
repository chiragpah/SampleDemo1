import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreindsCardComponent } from './freinds-card.component';

describe('FreindsCardComponent', () => {
  let component: FreindsCardComponent;
  let fixture: ComponentFixture<FreindsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreindsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreindsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
