import { Injectable } from '@angular/core';
import { AppconfigService } from './appconfig.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl: string = '';
  constructor(private config: AppconfigService, private http: HttpClient) {
    this.baseUrl = this.config.getApiUrl(); 
   }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { params });
  }

  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, { headers }).pipe(catchError(err => this.errorHandler(err)));;
  }

  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, { headers });
  }

  delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, { headers });
  }

  errorHandler(error: HttpErrorResponse) {
    // Log to console or send to remote logging server
    console.error('HTTP Error:', error);

    let message = 'An unexpected error occurred.';
    if (error.status === 0) {
      message = 'Cannot connect to the server.';
    } else if (error.error && error.error.message) {
      // ✅ Extract custom server message
      message = error.error.message;
    } else if (error.status === 401) {
      message = 'Unauthorized request.';
    } else if (error.status === 403) {
      message = 'Access denied.';
    } else if (error.status === 404) {
      message = 'Resource not found.';
    }

    console.error('Error occurred:', {
      status: error.status,
      body: error.error
    });
    // Return a user-facing error message
    return throwError(() => new Error(message));
  }


}
