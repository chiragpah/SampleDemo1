import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HandleError, HttpErrorHandler } from "./http-error-handler.service";
import { catchError } from 'rxjs/operators';

@Injectable()
export class RejectRequestService {
    private handleError: HandleError;

    constructor(
        private http: HttpClient,
        private httpErrorHandler: HttpErrorHandler
    ) {
        this.handleError = this.httpErrorHandler.createHandleError("Reject Friend Request");
    }

    rejectFriendRequest(rejectUrl: string) {
        const currentUserString = localStorage.getItem('currentUser');
        const token = currentUserString ? JSON.parse(currentUserString).token : null;

        // Check if token is available before setting the Authorization header
        const headers = token ? new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }) : new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.delete(rejectUrl, { headers })
            .pipe(
                catchError(this.handleError<any>('rejectFriendRequest'))
            );
    }
}
