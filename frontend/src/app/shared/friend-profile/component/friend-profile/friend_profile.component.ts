import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { getFriendService } from "../../service/get-friend.service";
import { FriendProfileDataService } from "../../service/friend-data.service";
import { UserProfile } from "../../../../../modules/Dashboard/model/profile";
import { postfeed } from "../../../../../modules/Dashboard/model/post";
import { RemoveFriendService } from "../../../../../modules/Dashboard/services/remove-friend.service";


@Component({
  selector: 'friend-profile-component',
  templateUrl: './friend_profile.component.html',
  styleUrls: ['./friend_profile.component.css'],
  providers: [getFriendService, RemoveFriendService]
})
export class FriendProfileComponent implements OnInit {
  @ViewChild('userPostsContainer') userPostsContainer!: ElementRef;
  age: number = 0;
  userProfile: UserProfile = {};
  userPost: postfeed[] = [];

  constructor(
    public dialog: MatDialog,
    private profileService: getFriendService,
    private removeFriendService: RemoveFriendService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.getUserPost();
    this.getAge();
  }

  goTofriends(): void {
    // this.router.navigate(['/friends']);
  }

  getUserDetails(): void {
    this.profileService.getUserData().subscribe((userData: UserProfile) => {
      this.userProfile = userData;
      console.log('Data for friend-profile:', userData);
      this.getAge();
    });
  }

  getUserPost(): void {
    this.profileService.getUserPost().subscribe((userData: postfeed[]) => {
      this.userPost = userData;
      console.log('Data from user Post API:', userData);
      this.userPost = this.userPost.filter(post => post.date_time).sort((a, b) => new Date(b.date_time!).getTime() - new Date(a.date_time!).getTime());
      console.log(this.userPost);
    });
  }

  getAge(): void {
    const dob = this.userProfile?.date_of_birth;
    if (dob) {
      const dobDate = new Date(dob);
      const timeDiff = Math.abs(Date.now() - dobDate.getTime());
      const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
      this.age = age;
    }
  }

  scrollToUserPosts() {
    this.userPostsContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  removeFriend() {
    const currentUserString = localStorage.getItem('friendId');
      if (!currentUserString) {
        throw new Error('currentUser not found in localStorage');
      }
      const currentUser = JSON.parse(currentUserString);
      const userID = currentUser;
    this.removeFriendService.removeFriend(userID).subscribe(() => {
    });
  //  alert("Are you sure?")
    this.router.navigate(['/feed'])
  }
}
