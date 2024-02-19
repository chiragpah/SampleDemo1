import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': 'Token 2f263d2e12c15213ddfc052f1960f3af3766c570'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private getHttpOptions(): { headers: HttpHeaders } {
    const currentUserString = localStorage.getItem('currentUser');
    if (!currentUserString) {
      throw new Error('currentUser not found in localStorage');
    }
    const currentUser = JSON.parse(currentUserString);
    const token = currentUser.token;
    if (!token) {
      throw new Error('Token not found in currentUser');
    }

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      })
    };
  }
  
  private apiUrl ='http://127.0.0.1:8000/api/posts/comments/';

  constructor(private http: HttpClient) { }

  // Get comments for a specific post
  getCommentsByPostId(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}by-post/${postId}/`,this.getHttpOptions());
  }

  // Add a new comment
  addComment(postId: number, commentText: string): Observable<any> {
    const requestBody = { post: postId, text: commentText };
    return this.http.post<any>(`${this.apiUrl}`, requestBody ,this.getHttpOptions());
  }
}


