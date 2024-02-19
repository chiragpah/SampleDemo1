import { Component } from '@angular/core';
import { SuggestService } from '../../../Friends/services/suggested.service';
import { RejectRequestService } from '../../../Friends/services/reject_request';
import { SendFriendRequestService } from '../../../Friends/services/send_friend_request.services';
import { User } from '../../../Friends/model/suggest.model';

@Component({
  selector: 'suggest-list',
  templateUrl: './suggest-list.component.html',
  styleUrls: ['./suggest-list.component.css'],
  providers: [SuggestService, SendFriendRequestService, RejectRequestService], // Include the RejectRequestService in providers
})
export class SuggestListComponent {

  users: User[] = [];
  currentUser: any;
  friendRequestStatus: { [userId: number]: boolean } = {}; // Object to track friend request status

  constructor(
    private suggestedService: SuggestService,
    private friendRequest: SendFriendRequestService,
    private rejectRequest: RejectRequestService // Inject the RejectRequestService
  ) { }

  ngOnInit() {
    this.currentUser = this.getCurrentUser();
    this.getData();
  }

  getData(): void {
    this.suggestedService.getData()
      .subscribe(users => (this.users = users));
  }

  getCurrentUser(): any {
    const currentUserString = localStorage.getItem('currentUser');
    return currentUserString ? JSON.parse(currentUserString) : null;
  }

  toggleFriendRequest(userId: number) {
    // If friend request is not sent, send friend request. Otherwise, cancel friend request.
    if (!this.friendRequestStatus[userId]) {
      this.sendFriendRequest(userId);
    } else {
      this.cancelFriendRequest(userId);
    }
  }

  sendFriendRequest(userId: number) {
    console.log('Sending friend request to user with ID:', userId);

    // Call the sendFriendRequest method from the service
    this.friendRequest.sendFriendRequest(this.currentUser.id, userId)
      .subscribe(
        response => {
          console.log('Friend request sent successfully:', response);
          this.friendRequestStatus[userId] = true; // Update request status to true
        },
        error => console.error('Error sending friend request:', error)
      );
  }

  cancelFriendRequest(userId: number) {
    console.log('Canceling friend request to user with ID:', userId);
  
    // Perform cancellation logic here
  
    // Call the rejectFriendRequest method from the service
    // this.rejectRequest.rejectFriendRequest()
    //   .subscribe(
    //     response => {
    //       console.log('Friend request canceled successfully:', response);
    //       // Update request status to false
          this.friendRequestStatus[userId] = false;
    //       // Perform any additional logic after canceling friend request
    //     },
    //     error => console.error('Error canceling friend request:', error)
    //   );
  }
}
