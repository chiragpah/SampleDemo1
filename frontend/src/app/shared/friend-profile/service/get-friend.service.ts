// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { HandleError, HttpErrorHandler } from '../../../../modules/Dashboard/services/http-error-handler.service';
// import { FriendProfileDataService } from './friend-data.service';
// import { UserProfile } from '../../../../modules/Dashboard/model/profile';
// import { postfeed } from '../../../../modules/Dashboard/model/post';

// @Injectable()
// export class getFriendService {
//     private profileApiUrl = 'http://127.0.0.1:8000/api/auth/login/users';
//     private postUrl = ' http://127.0.0.1:8000/api/posts/posts/user';
//     private handleError: HandleError;

//     constructor(
//         private http: HttpClient,
//         private httpErrorHandler: HttpErrorHandler,
//         private friendProfileDataService: FriendProfileDataService
//     ) {
//         this.handleError = this.httpErrorHandler.createHandleError('ProfileService');
//     }

//     private getHttpOptions(): { headers: HttpHeaders } {
//         const currentUserString = localStorage.getItem('currentUser');
//         if (!currentUserString) {
//             throw new Error('currentUser not found in localStorage');
//         }
//         const currentUser = JSON.parse(currentUserString);
//         const token = currentUser.token;
//         if (!token) {
//             throw new Error('Token not found in currentUser');
//         }

//         return {
//             headers: new HttpHeaders({
//                 'Content-Type': 'application/json',
//                 'Authorization': `Token ${token}`
//             })
//         };
//     }

//     getUserData(userId: number): Observable<UserProfile> {
//         if (!userId) {
//             return throwError('User ID not found');
//         }
//         const url = `${this.profileApiUrl}/${userId}/`;
//         return this.http.get<UserProfile>(url, this.getHttpOptions()).pipe(
//             catchError(this.handleError<UserProfile>('getUserData'))
//         );
//     }

//     getUserPost(userId: number): Observable<postfeed[]> {
//         if (!userId) {
//             return throwError('User ID not found');
//         }
//         const url = `${this.postUrl}/${userId}/`;
//         return this.http.get<postfeed[]>(url, this.getHttpOptions()).pipe(
//             catchError(this.handleError<postfeed[]>('getUserData'))
//         );
//     }
// }



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { HandleError, HttpErrorHandler } from '../../../../modules/Dashboard/services/http-error-handler.service';
import { UserProfile } from '../../../../modules/Dashboard/model/profile';
import { postfeed } from '../../../../modules/Dashboard/model/post';



@Injectable()
export class getFriendService {
  private profileApiUrl = 'http://127.0.0.1:8000/api/auth/login/users';
  private postUrl = ' http://127.0.0.1:8000/api/posts/posts/user';
  private handleError: HandleError;

  // BehaviorSubject to track changes in userProfile
  private userProfileSubject: BehaviorSubject<UserProfile> = new BehaviorSubject<UserProfile>({});
  public userProfile$: Observable<UserProfile> = this.userProfileSubject.asObservable();

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('ProfileService');
  }


  private getHttpOptions(): { headers: HttpHeaders } {
    const currentUserString = localStorage.getItem('currentUser');
    if (!currentUserString) {
      throw new Error('currentUser not found in localStorage');
    }
    const currentUser = JSON.parse(currentUserString);
    const token = currentUser.token;
    if (!token) {
      throw new Error('Token not found in currentUser');
    }

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      })
    };
  }

  getUserData(): Observable<UserProfile> {
    try {
      if (typeof localStorage === 'undefined') {
        // console.warn('localStorage is not available in this environment.');
    }
      const currentUserString = localStorage.getItem('friendId');
      if (!currentUserString) {
        throw new Error('currentUser not found in localStorage');
      }
      const currentUser = JSON.parse(currentUserString);
      const userID = currentUser;
      const url = `${this.profileApiUrl}/${userID}/`;
      return this.http.get<UserProfile>(url, this.getHttpOptions()).pipe(
        catchError(this.handleError<UserProfile>('getUserData'))
      );
    } catch (error) {
      return throwError(error);
    }
  }


  getUserPost(): Observable<postfeed[]> {
    try {
      if (typeof localStorage === 'undefined') {
        // console.warn('localStorage is not available in this environment.');
    }
      const currentUserString = localStorage.getItem('friendId');
      if (!currentUserString) {
        throw new Error('currentUser not found in localStorage');
      }
      const currentUser = JSON.parse(currentUserString);
      const userID = currentUser;
      const url = `${this.postUrl}/${userID}/`;
      return this.http.get<postfeed[]>(url, this.getHttpOptions()).pipe(
        catchError(this.handleError<postfeed[]>('getUserData'))
      );
    } catch (error) {
      return throwError(error);
    }
  }

}