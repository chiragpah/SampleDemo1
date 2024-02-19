import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { postfeed } from '../model/post';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Router } from '@angular/router';


@Injectable()
export class postService {
  postcardUrl = ' http://127.0.0.1:8000/api/posts/posts/';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    private router: Router,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('postService');
  }

  getPostsByUsername(): Observable<postfeed[]> {
    if (typeof localStorage === 'undefined') {
      console.warn('localStorage is not available in this environment.');
      return of([]);
    }

    const localUserString = localStorage.getItem('currentUser');
    if (!localUserString) {
      // Handle the case where currentUser is not found in local storage
      this.handleTokenError();
      return of([]);
    }

    const localUser = JSON.parse(localUserString);
    const token = localUser.token;
    if (!token) {
      // Handle the case where token is not found in local storage
      this.handleTokenError();
      return of([]);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      })
    };

    return this.http.get<postfeed[]>(this.postcardUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getEntries', []))
      );
  }
  private handleTokenError(): void {
    // Redirect to login page and provide feedback to the user
    this.router.navigate(['/login']);
    // Optionally, you can also display a message to the user
    // alert('You need to login to access this page.');
    // Log the error for debugging purposes
    console.error('Token not found or invalid in local storage.');
  }

  
}