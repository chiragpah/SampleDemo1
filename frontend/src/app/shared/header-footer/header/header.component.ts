import { Component } from '@angular/core';
import { User } from '../../../../modules/Friends/model/suggest.model';
import { SuggestService } from '../../../../modules/Friends/services/suggested.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../modules/Dashboard/services/profile.service';
import { UserProfile } from '../../../../modules/Dashboard/model/profile';
import { AuthService } from '../../../../modules/Dashboard/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [SuggestService, ProfileService, AuthService]
})
export class HeaderComponent {
  searchResults: User[] = [];
  userProfile: UserProfile = {};

  constructor(
    private suggestService: SuggestService,
    private profileService: ProfileService,
    private authService : AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.checkTokenAndNavigate();
    this.getUserDetails();
  }

  onSearch(event: any): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm) {
      this.suggestService.searchUsers(searchTerm).subscribe(users => {
        this.searchResults = users;
      });
    } else {
      this.searchResults = [];
    }
  }

  getUserDetails(): void {
    this.profileService.getUserData().subscribe((userData: UserProfile) => {
      this.userProfile = userData;
      // console.log('Data from API:', userData);
    });
  }

  selectUser(user: User): void {
    // Implement the logic to handle selection of a user
    console.log("user is here....", user);
    this.clearSearchResults();
  }

  clearSearchResults(): void {
    this.searchResults = [];
  }
  logout(): void {
    localStorage.removeItem('currentUser'); // Remove data from local storage
    this.router.navigate(['/']); // Navigate to login page
  }
}
