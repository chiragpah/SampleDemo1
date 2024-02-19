import { Component } from '@angular/core';
import { MyFriendService } from '../../services/my-friends.service';
import { User } from '../../../Friends/model/suggest.model';
import { RemoveFriendService } from '../../services/remove-friend.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FriendProfileDataService } from '../../../../app/shared/friend-profile/service/friend-data.service';

@Component({
  selector: 'app-my-friend-list',
  templateUrl: './my-friend-list.component.html',
  styleUrls: ['./my-friend-list.component.css'],
  providers: [MyFriendService, AuthService, FriendProfileDataService]
})
export class MyFriendListComponent {
  users: User[] = [];
  currentUser: any;

  constructor(
    private myFriendService: MyFriendService,
    private removeFriendService: RemoveFriendService,
    private router: Router,
    private authService: AuthService,
    private friendIdData: FriendProfileDataService
  ) { }

  ngOnInit() {
    this.authService.checkTokenAndNavigate();
    this.currentUser = this.getCurrentUser();
    this.getData();
    console.log(this.users);
  }

  getData(): void {
    this.myFriendService.getData().subscribe(users => (this.users = users
    ));
  }

  getCurrentUser(): any {
    const currentUserString = localStorage.getItem('currentUser');
    return currentUserString ? JSON.parse(currentUserString) : null;
  }

  cancelFriend(userId: number) {
    this.removeFriendService.removeFriend(userId).subscribe(() => {
      // Remove the friend from the list after successful removal
      this.users = this.users.filter(user => user.id !== userId);
    });
  }
  profile(userId: number) {
    console.log(userId)
    localStorage.setItem("friendId", JSON.stringify(userId))
    this.friendIdData.setUserId(userId);
    this.router.navigate(['/friends-profile']);
  }
}
