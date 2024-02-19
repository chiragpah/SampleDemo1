import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFriendCardComponent } from './my-friend-card.component';

describe('MyFriendCardComponent', () => {
  let component: MyFriendCardComponent;
  let fixture: ComponentFixture<MyFriendCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyFriendCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFriendCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
