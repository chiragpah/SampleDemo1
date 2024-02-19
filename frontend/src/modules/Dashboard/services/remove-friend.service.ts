import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RemoveFriendService {
    private removeFriendUrl = 'http://127.0.0.1:8000/api/friendship/remove-friend/';
    friendRemoved: EventEmitter<number> = new EventEmitter<number>(); // Event emitter for friend removal
    constructor(private http: HttpClient, private authService: AuthService) { }

    removeFriend(userId: number): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token ? `Token ${token}` : ''
        });

        return this.http.delete<any>(`${this.removeFriendUrl}${userId}/`, { headers }).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 404) {
                    // Success: friend removed
                    console.log('Friend removed successfully.');
                    // Emit event to notify parent component
                    this.friendRemoved.emit(userId);
                    return Observable.create(null); // Return empty observable
                } else {
                    return throwError(error); // Throw error for other status codes
                }
            })
        );
    }
}
