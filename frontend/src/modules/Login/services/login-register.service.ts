import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': 'Token 2f263d2e12c15213ddfc052f1960f3af3766c570'
    
  })
}

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  api_url: string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(this.api_url + '/api/auth/api-user-login/', { username, password }, httpOptions).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem("currentUser", JSON.stringify(user))
        }
        return user
      })
    )
  }

  logout() {
    localStorage.removeItem('currentUser')
  }
  register(
    first_name: string, 
    last_name: string, 
    email: string, 
    phone: string,
     password: string, 
     gender: string, 
     date_of_birth: Date, 
     location: string
     ) {
    console.log("register");
 
    return this.http.post<any>(this.api_url + '/api/auth/register/',
      {
        first_name,
        last_name,
        email,
        phone,
        password,
        gender,
        date_of_birth,
        location
      }
      , httpOptions)
    
  };

}
