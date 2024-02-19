import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFriendListComponent } from './my-friend-list.component';

describe('MyFriendListComponent', () => {
  let component: MyFriendListComponent;
  let fixture: ComponentFixture<MyFriendListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyFriendListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
