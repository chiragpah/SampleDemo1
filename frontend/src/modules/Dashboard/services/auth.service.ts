import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) { }

  getToken(): string | null {
    if (typeof localStorage === 'undefined') {
      console.warn('localStorage is not available in this environment.');
    }
    const currentUserString = localStorage.getItem('currentUser');
    const token = currentUserString
      ? JSON.parse(currentUserString).token
      : null;
    return token;
  }

  removeToken(): void {
    localStorage.removeItem('currentUser');
  }

  // Method to check token and navigate if absent
  checkTokenAndNavigate(): void {
    const token = this.getToken();
    if (!token) {
      this.router.navigate(['/']);
    }
  }
}
