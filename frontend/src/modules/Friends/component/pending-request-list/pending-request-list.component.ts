import { Component } from '@angular/core';
import { AcceptService } from '../../services/accept.service';
import { RejectRequestService } from '../../services/reject_request';
import { PendingRequestService } from '../../services/pending_request.service';
import { FriendCardData } from '../../model/suggest.model';
import { AuthService } from '../../../Dashboard/services/auth.service';

@Component({
  selector: 'app-pending-request-list',
  templateUrl: './pending-request-list.component.html',
  styleUrls: ['./pending-request-list.component.css'],
  providers: [PendingRequestService, AcceptService, RejectRequestService, AuthService],
})
export class PendingRequestListComponent {
  pendingRequests: { requestId: number, sender: FriendCardData }[] = [];

  constructor(
    private pendingRequestService: PendingRequestService,
    private acceptService: AcceptService,
    private rejectRequestService: RejectRequestService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.checkTokenAndNavigate();
    this.getData();
  }

  getData(): void {
    this.pendingRequestService.getData().subscribe((pendingRequests) => {
      this.pendingRequests = pendingRequests;
    });
  }

  approveFriendRequest(requestId: number): void {
    console.log("Approved request with ID:", requestId);
    // Call the approveFriendRequest method from the accept service
    this.acceptService.approveFriendRequest(requestId).subscribe(() => {
      // Optional: Handle success response
      console.log("Friend request approved successfully.");
      // After approving the request, remove it from the pendingRequests array
      this.pendingRequests = this.pendingRequests.filter(request => request.requestId !== requestId);
    }, (error: any) => {
      // Optional: Handle error response
      console.error("Error occurred while approving friend request:", error);
    });
  }

  rejectFriendRequest(requestId: number): void {
    console.log("Rejected request with ID:", requestId);
    // Append the requestId to the URL and call the rejectFriendRequest method from the service to delete the friend request
    const rejectUrl = `http://127.0.0.1:8000/api/friendship/reject-friend-request/${requestId}`;
    this.rejectRequestService.rejectFriendRequest(rejectUrl).subscribe(() => {
      // Optional: Handle success response
      console.log("Friend request rejected successfully.");
      // After rejecting the request, remove it from the pendingRequests array
      this.pendingRequests = this.pendingRequests.filter(request => request.requestId !== requestId);
    }, (error: any) => {
      // Optional: Handle error response
      console.error("Error occurred while rejecting friend request:", error);
    });
  }

  reloadPendingRequests(): void {
    this.getData(); // Call your existing getData() method to fetch the latest data
  }

}
