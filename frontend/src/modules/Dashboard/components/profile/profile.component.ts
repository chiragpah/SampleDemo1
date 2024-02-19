import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from "../edit_profile/edit_profile.component";
import { UserProfile } from "../../model/profile";
import { ProfileService } from "../../services/profile.service";
import { Router } from '@angular/router';
import { postfeed } from "../../model/post";
import { EditImageComponent } from "../edit_profile/edit_image/edit_image.component";

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService],
})
export class ProfileComponent implements OnInit {
  @ViewChild('userPostsContainer') userPostsContainer!: ElementRef;
  age:number=0;
  userProfile: UserProfile = {
    // userName:"User1",
    // userLocation:"Mumbai",
    // userImage:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // numberOfFriends:200,
    // numberOfPost:100,
    // userBio:"Summary/Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque."
  }
  selectedFile: any | null = null;
  pictureUploaded: boolean = false;
  caption: string = '';

  userPost:postfeed[]=[]
 
  constructor(
    public dialog: MatDialog,
    private profileService: ProfileService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.getUserPost();
    this.getAge();

  }
  goTofriends(): void {
    this.router.navigate(['/friends']);
  }

  getUserDetails(): void {
    this.profileService.getUserData().subscribe((userData: UserProfile) => {
      this.userProfile = userData;
      console.log('Data from API:', userData);
      this.getAge()
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
      // Convert date string to Date object
      const dobDate = new Date(dob);
      // Check if the conversion was successful
        const timeDiff = Math.abs(Date.now() - dobDate.getTime());
        const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        this.age=age;
    } 
  }
  
  // likePost(postId: number): void {
  //   // Update the post in the local array to reflect the like state
  //   const updatedPostIndex = this.userPost.findIndex((post) => post.post_id === postId);
    
  //   if (updatedPostIndex !== -1) {
  //     // Assuming 'likedByCurrentUser' is a boolean indicating whether the current user has liked the post
  //     this.userPost[updatedPostIndex].likedByCurrentUser = !this.userPost[updatedPostIndex].likedByCurrentUser;
  
  //     // If 'likedByCurrentUser' is true, increment the likesCount; otherwise, decrement
  //     this.userPost[updatedPostIndex].likesCount += this.posts[updatedPostIndex].likedByCurrentUser ? 1 : -1;
  //   }
  
  //   // Call your service to send a like request to the backend
  //   this.likeService.likePost(postId).subscribe((response) => {
  //     // Handle the response if needed
  //     console.log(response);
  //   });
  // }
  scrollToUserPosts() {
    this.userPostsContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  
  openEditProfileModal(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '75%',
      height: '80%',

      data: {
        // Pass any data to the modal if needed
        userProfile: { ...this.userProfile }
      }
    });

    dialogRef.afterClosed().subscribe((result: UserProfile) => {
      if (result) {
        console.log('Updated profile received:', result);

        // Update the local userProfile with the edited data
        this.userProfile = { ...result };
      }
    });
  }

  openEditImage(): void {
    const dialogRef = this.dialog.open(EditImageComponent, {
      height:'auto',
      width: '650px',
      
    });

    dialogRef.afterClosed().subscribe( {
    });
  }
}


