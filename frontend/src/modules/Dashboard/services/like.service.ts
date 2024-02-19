import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import your AuthService

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl = 'http://127.0.0.1:8000/api/posts/posts';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPostsByUsername(): Observable<any> {
    // Get the token from AuthService
    const token = this.authService.getToken();

    // Set the headers with the token
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    // Use headers in the request
    return this.http.get<any[]>(`${this.apiUrl}/username`, { headers });
  }

  // Add a method to handle post liking
  likePost(postId: number): Observable<any> {
    // Get the token from AuthService
    const token = this.authService.getToken();

    // Set the headers with the token
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    // Use headers in the request
    const body = { post_id: postId };
    console.log(postId)
    return this.http.post<any>(`${this.apiUrl}/${postId}/like/`, body, { headers });
  }
}
