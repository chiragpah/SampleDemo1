import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiFriendData, FriendCardData } from '../model/suggest.model';

@Injectable({
  providedIn: 'root',
})
export class PendingRequestService {
  private apiUrl = 'http://127.0.0.1:8000/api/friendship/pending-friend-requests/';

  constructor(private http: HttpClient) { }

  getData(): Observable<{ requestId: number, sender: FriendCardData }[]> {
    const currentUserString = localStorage.getItem('currentUser');
    const token = currentUserString ? JSON.parse(currentUserString).token : null;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Token ${token}` : ''
    });

    const httpOptions = {
      headers: headers
    };

    return this.http.get<ApiFriendData[]>(this.apiUrl, httpOptions).pipe(
      map((apiData: ApiFriendData[]) =>
        apiData.map((item: ApiFriendData) => ({
          requestId: item.id,
          sender: item.sender
        }))
      )
    );
  }
}
