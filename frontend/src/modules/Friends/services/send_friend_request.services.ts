import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HandleError, HttpErrorHandler } from "./http-error-handler.service";
import { catchError } from 'rxjs/operators';

@Injectable()
export class SendFriendRequestService {
    private handleError: HandleError;
    private url = "http://127.0.0.1:8000/api/friendship/send-friend-request/";

    constructor(
        private http: HttpClient,
        private httpErrorHandler: HttpErrorHandler
    ) {
        this.handleError = this.httpErrorHandler.createHandleError("Send Friend Request");
    }

    sendFriendRequest(sender: number, receiver: number) {
        const payload = {
            sender: sender,
            receiver: receiver
        };

        const currentUserString = localStorage.getItem('currentUser');
        const token = currentUserString ? JSON.parse(currentUserString).token : null;

        // Check if token is available before setting the Authorization header
        const headers = token ? new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }) : new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post(this.url, payload, { headers })
            .pipe(
                catchError(this.handleError<any>('sendFriendRequest'))
            );
    }
}
