import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { postfeed } from '../../../model/post';
import { HandleError, HttpErrorHandler } from '../../../services/http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token 8d347bda86b10e4d701e40285ed36d6ce12dca3b'
  })
};

@Injectable()
export class postService {
  postcardUrl = ' http://127.0.0.1:8000/api/posts/posts/';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('postService');
  }

  getPostsByUsername(): Observable<postfeed[]> {
    return this.http.get<postfeed[]>(this.postcardUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getEntries', []))
      );
  }
}