import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MyFriendService } from '../../services/my-friends.service';
import { User } from '../../../Friends/model/suggest.model';

@Component({
  selector: 'app-my-friend-card',
  templateUrl: './my-friend-card.component.html',
  styleUrls: ['./my-friend-card.component.css']
})
export class MyFriendCardComponent {
  @Input() user!: User;
  @Output() cancelFriendClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() profile: EventEmitter<number> = new EventEmitter<number>();


  constructor(private myFriendService: MyFriendService) { }

  cancelFriend() {
    this.cancelFriendClicked.emit(this.user.id);
  }

  viewProfile() {
    // Implement logic to navigate to the user's profile page
    this.profile.emit(this.user.id);
  }

  openChats() {
    // Implement logic to open chats with the user
  }
}
