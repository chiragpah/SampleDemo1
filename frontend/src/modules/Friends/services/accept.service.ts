import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { HandleError, HttpErrorHandler } from "./http-error-handler.service";

@Injectable()
export class AcceptService {
    private handleError: HandleError;
    private url = "http://127.0.0.1:8000/api/friendship/approve-friend-request/";

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('AcceptService');
    }

    approveFriendRequest(id: number): Observable<any> {
        const requestUrl = `${this.url}${id}/`;
        const payload = { "is_accepted": true };
        if (typeof localStorage === 'undefined') {
            // console.warn('localStorage is not available in this environment.');
        }
        const currentUserString = localStorage.getItem('currentUser');
        const token = currentUserString ? JSON.parse(currentUserString).token : null;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            })
        };

        return this.http.patch(requestUrl, payload, httpOptions)
            .pipe(
                catchError(this.handleError('approveFriendRequest', []))
            );
    }
}
