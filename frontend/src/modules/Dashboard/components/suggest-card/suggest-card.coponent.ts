import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'suggest-card',
    templateUrl: './suggest-card.componenet.html',
    styleUrls: ['./suggest-card.component.css']
})
export class SuggestCardComponent {
    @Input() userName: string = 'Shoaib';
    @Input() profilePicUrl: string = "https://th.bing.com/th/id/OIP.x7X2oAehk5M9IvGwO_K0PgHaHa?rs=1&pid=ImgDetMain";
    @Input() friendRequestStatus: boolean = false; // Declare friendRequestStatus input property
    @Output() friendRequestClicked: EventEmitter<void> = new EventEmitter<void>();

    sendFriendRequest() {
        this.friendRequestClicked.emit();
    }
}
