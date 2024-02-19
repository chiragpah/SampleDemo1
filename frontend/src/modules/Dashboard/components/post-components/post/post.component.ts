// post.component.ts
import { Component, OnInit, SimpleChange } from '@angular/core';
import { postService } from '../../../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { ReportComponent } from './report/report.component';
import { DomSanitizer } from '@angular/platform-browser';
import { LikeService } from '../../../services/like.service';
import { CommentService } from './service/comment.service';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  providers: [postService, LikeService],
  styleUrls: ['./post.component.css']
})


export class PostComponent implements OnInit {
  
  posts: any[] = [];
  showComments: boolean = false;


  constructor(
    private postService: postService,
    private sanitizer: DomSanitizer,
    private likeService: LikeService,

    public dialog: MatDialog,
    private commentService:CommentService

  ) {}

  ngOnInit(): void {
    this.postService.getPostsByUsername().subscribe((data) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

   toggleComments(): void {
    this.showComments = !this.showComments;
  }

  
  likePost(postId: number): void {
    // Update the post in the local array to reflect the like state
    const updatedPostIndex = this.posts.findIndex((post) => post.post_id === postId);
   
    if (updatedPostIndex !== -1) {
      // Assuming 'likedByCurrentUser' is a boolean indicating whether the current user has liked the post
      this.posts[updatedPostIndex].likedByCurrentUser = !this.posts[updatedPostIndex].likedByCurrentUser;
  
      // If 'likedByCurrentUser' is true, increment the likesCount; otherwise, decrement
      this.posts[updatedPostIndex].likesCount += this.posts[updatedPostIndex].likedByCurrentUser ? 1 : -1;
    }
  
    // Call your service to send a like request to the backend
    this.likeService.likePost(postId).subscribe((response) => {
      // Handle the response if needed
      console.log(response);
    });
  }
  
  
  

  OpenReport(postId: number): void {
    const dialogRef = this.dialog.open(ReportComponent, {
      height: 'auto',
      width: '650px',
      data: { postId: postId }
    });

    dialogRef.afterClosed().subscribe({
      // Handle dialog closed event if needed
    });
  }


/// comments code 
panelOpenState = false;
comments: any[]=[];
temp: string[] = [];
tempUser: string[] = [];
newComment!: string;
postId!: number; 


loadComments(post_id:number) {
  this.postId = post_id;
  console.log(this.postId);
  if (this.postId) {
    this.commentService.getCommentsByPostId(this.postId).subscribe((data: any[]) => {
      this.comments = data;
      this.temp = [];
      this.tempUser = [];
      for(let i = 0; i < this.comments.length; i++){
        this.temp.push(this.comments[i].text);
        let name =  this.comments[i].user.first_name + " " + this.comments[i].user.last_name;
        this.tempUser.push(name);
      }
      
      // console.log(this.tempUser);
      // console.log(this.comments);
      
    });
  }
}

addComment() {
  if (this.postId) {
    this.commentService.addComment(this.postId, this.newComment).subscribe(() => {
      this.loadComments(this.postId); // Refresh comments after adding a new comment
      this.newComment = ''; 
    });
  }
}



updatePostId(postId: number) {
  this.postId = postId;
  this.loadComments(this.postId); // Load comments for the selected post
}
}



