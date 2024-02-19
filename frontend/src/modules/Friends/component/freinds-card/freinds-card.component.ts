import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-freinds-card',
  templateUrl: './freinds-card.component.html',
  styleUrls: ['./freinds-card.component.css']
})
export class FreindsCardComponent {
  @Input() userName: string = 'Shoaib';
  @Input() profilePicUrl: string = "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain";
  @Input() friendRequestStatus: boolean = false; // Declare friendRequestStatus input property
  @Output() friendRequestClicked: EventEmitter<void> = new EventEmitter<void>();

  sendFriendRequest() {
    this.friendRequestClicked.emit();
  }
}
