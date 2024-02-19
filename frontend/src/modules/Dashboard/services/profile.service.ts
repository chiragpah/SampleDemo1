// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';


// import { BehaviorSubject, Observable } from 'rxjs';
// import { catchError } from 'rxjs/operators';


// import { HttpErrorHandler, HandleError } from './http-error-handler.service';
// import { UserProfile } from '../model/profile';


// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//    // Authorization: 'Token e25f70a3c50a681ab071a1e6aff08bdf9a75ed02a'
//    Authorization:'Token 8d347bda86b10e4d701e40285ed36d6ce12dca3b'

//   })
// };

// @Injectable()
// export class ProfileService {

//   profileApiUrl = 'http://127.0.0.1:8000/api/auth/login/users';
//   private handleError: HandleError;

//   // BehaviorSubject to track changes in userProfile
//   private userProfileSubject: BehaviorSubject<UserProfile> = new BehaviorSubject<UserProfile>({});
//   public userProfile$: Observable<UserProfile> = this.userProfileSubject.asObservable();
//   constructor(
//     private http: HttpClient,
//     httpErrorHandler: HttpErrorHandler) {
//     this.handleError = httpErrorHandler.createHandleError('ProfileService');
//   }

//   getUserData(): Observable<UserProfile> {
//     let currentUser:any =localStorage?.getItem('currentUser');
//     currentUser=JSON.parse(currentUser);
//     const userID=currentUser.id;
//     const url=`${this.profileApiUrl}/${userID}`;
//     return this.http.get<UserProfile>(url,httpOptions).pipe(
//       catchError(this.handleError('getUserData', {}))
//     );
//   }

//   updateUserData(updatedUserData: UserProfile): void {
//     // Emit the updated userProfile to subscribers
//     this.userProfileSubject.next(updatedUserData);

//     // Make a PUT request to update data in the database
//     let currentUser:any = localStorage?.getItem('currentUser');
//     currentUser=JSON.parse(currentUser);
//     const userID=currentUser.id;
//     const updateUrl = `${this.profileApiUrl}/${userID}/`;
//     this.http.put(updateUrl, updatedUserData, httpOptions)
//       .pipe(
//         catchError(this.handleError('updateUserData', {}))
//       )
//       .subscribe(response => {
//         console.log('Profile data updated successfully:', response);
//       });
//   }

// }



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { BehaviorSubject } from 'rxjs';
import { UserProfile } from '../model/profile';
import { postfeed } from '../model/post';


@Injectable()
export class ProfileService {
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
      const currentUserString = localStorage.getItem('currentUser');
      if (!currentUserString) {
        throw new Error('currentUser not found in localStorage');
      }
      const currentUser = JSON.parse(currentUserString);
      const userID = currentUser.id;
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
      const currentUserString = localStorage.getItem('currentUser');
      if (!currentUserString) {
        throw new Error('currentUser not found in localStorage');
      }
      const currentUser = JSON.parse(currentUserString);
      const userID = currentUser.id;
      const url = `${this.postUrl}/${userID}/`;
      return this.http.get<postfeed[]>(url, this.getHttpOptions()).pipe(
        catchError(this.handleError<postfeed[]>('getUserData'))
      );
    } catch (error) {
      return throwError(error);
    }
  }


  updateUserData(updatedUserData: UserProfile): void {
    this.userProfileSubject.next(updatedUserData);
    try {
      if (typeof localStorage === 'undefined') {
        // console.warn('localStorage is not available in this environment.');
    }
      const currentUserString = localStorage.getItem('currentUser');
      if (!currentUserString) {
        throw new Error('currentUser not found in localStorage');
      }
      const currentUser = JSON.parse(currentUserString);
      const userID = currentUser.id;
      const updateUrl = `${this.profileApiUrl}/${userID}/`;

      this.http.patch(updateUrl, updatedUserData, this.getHttpOptions()).pipe(
        catchError(this.handleError<any>('updateUserData'))
      ).subscribe(response => {
        console.log('Profile data updated successfully:', response);
      });
    } catch (error) {
      throwError(error);
    }
  }
  updateProfilePic(media: File | null) {
    const formData = new FormData();
    // formData.append('gender','Male')
    // formData.append('location','India')
    // formData.append('password','cybage123')
    // formData.append('phone','9172863542')

    if (media) {
      // Set the filename to the post ID only if media is not null
      const filename = Date.now() + '_' + media.name; // Generate a unique filename
      formData.append('profile_pic', media, filename);

    }

    const currentUserString: any = localStorage?.getItem('currentUser');
    const token = currentUserString ? JSON.parse(currentUserString).token : null;
    const currentUser = JSON.parse(currentUserString);
    const userID = currentUser.id;
    const updateUrl = `${this.profileApiUrl}/${userID}/`;


    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    });

    return this.http.patch<any>(updateUrl, formData, { headers })
      ;
  }
  // const currentUserString = localStorage.getItem('currentUser');
  // const token = currentUserString ? JSON.parse(currentUserString).token : null;


  // const temp=`${this.profileApiUrl}/10`
  // const headers = new HttpHeaders({
  //   Authorization: `Token ${token}`,
  // });

  // return this.http.put<any>('http://127.0.0.1:8000/api/auth/login/users/10/', formData, { headers })
}