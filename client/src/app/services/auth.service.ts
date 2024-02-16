import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
// export class LoginService {

//     // private loginUrl = ''; // Replace with your login API endpoint

//   

//     login(loginUrl: string, userobj: object): Observable<any> {
//         // Set up the HTTP request headers if needed
//         const headers = new HttpHeaders({
//             'Content-Type': 'application/json'
//         });

//         // Make the HTTP request to the login endpoint with the provided username and password
//         return this.http.post<any>(loginUrl, userobj, { headers });
//     }
// }
export class authService {
    constructor(private http: HttpClient) { }

    login(url: string, data: object): Observable<any> {

        console.log(url, data);

        return this.http.post<any>(url, data);



    }
}