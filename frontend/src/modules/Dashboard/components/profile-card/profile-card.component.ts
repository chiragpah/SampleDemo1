import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { UserProfile } from '../../model/profile';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  providers: [ProfileService],
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  userData: UserProfile = {};
  

  constructor(private profileService: ProfileService,private router: Router) { }

  ngOnInit(): void {
    this.profileService.getUserData().subscribe((data) => {
      this.userData = data;
   
    });
  }

  navigateToFriendsPage(): void {
    // Navigate to the Friends page
    this.router.navigate(['/friends']);
  }
  
  navigateToPostsPage(): void {
    // Navigate to the Posts page
    this.router.navigate(['/profile']);
  }
  



}
