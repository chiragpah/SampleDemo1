// report.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private reportApiUrl = 'http://127.0.0.1:8000/api/posts/reports/';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('ReportService');
  }

  private getHeaders(): HttpHeaders {
    const currentUser = this.authService.getToken();

    if (currentUser) {
      return new HttpHeaders({
        Authorization: `Token ${currentUser}`,
        'Content-Type': 'application/json',
      });
    } else {
      throw new Error('User not authenticated');
    }
  }

  reportPost(postId: number, reason: string): Observable<any> {
    const reportPayload = {
      post: postId,
      reason: reason,
    };

    const headers = this.getHeaders();

    return this.http.post<any>(this.reportApiUrl, reportPayload, { headers })
      .pipe(
        catchError(this.handleError<any>('reportPost'))
      );
  }
}
