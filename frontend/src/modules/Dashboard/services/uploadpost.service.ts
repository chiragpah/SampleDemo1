// uploadpost.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HandleError } from './http-error-handler.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UploadPostService {
  private postapiUrl = 'http://127.0.0.1:8000/api/posts/posts/';
  private handleError: HandleError;

  constructor(
    private router: Router,
    httpErrorHandler: HttpErrorHandler,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.handleError = httpErrorHandler.createHandleError('UploadPostService');
  }

  createPostWithMedia(caption: string, text: string,  media: File| null,options : string ) {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('text', text);
    formData.append('type',options)
    console.log(media?.type)

    if (media) {
      // Set the filename to the post ID only if media is not null
      const filename = Date.now() + '_' + media.name + '.' + media.type; // Generate a unique filename
      formData.append('media', media, filename);
    }

    const currentUserString = localStorage.getItem('currentUser');
    const token = currentUserString ? JSON.parse(currentUserString).token : null;
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    });

    return this.http.post(this.postapiUrl, formData, { headers });
  }

}
