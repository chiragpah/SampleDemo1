import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { User } from '../model/suggest.model';

@Injectable()
export class SuggestService {
    url = "http://127.0.0.1:8000/api/auth/login/users/";
    private handleError: HandleError;

    constructor(
        private http: HttpClient,
        private httpErrorHandler: HttpErrorHandler
    ) {
        this.handleError = this.httpErrorHandler.createHandleError('Suggestion_friends_data');
    }

    getData(): Observable<User[]> {
        if (typeof localStorage === 'undefined') {
            // console.warn('localStorage is not available in this environment.');
        }
        const currentUserString = localStorage.getItem('currentUser');
        const token = currentUserString ? JSON.parse(currentUserString).token : null;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token ? `Token ${token}` : '' // Check if token is not null before assigning
            })
        };

        return this.http.get<User[]>(this.url, httpOptions)
            .pipe(
                catchError(this.handleError('suggested_getData', []))
            );
    }

    searchUsers(query: string): Observable<User[]> {
        const currentUserString = localStorage.getItem('currentUser');
        const token = currentUserString ? JSON.parse(currentUserString).token : null;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token ? `Token ${token}` : '' // Check if token is not null before assigning
            })
        };

        return this.http.get<User[]>(`${this.url}?query=${query}`, httpOptions)
            .pipe(
                catchError(this.handleError('searchUsers', []))
            );
    }

}
