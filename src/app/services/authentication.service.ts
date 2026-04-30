/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //private apiUrl = 'http://localhost:8080/authenticate';  
  private apiUrl = 'https://api.globalsumi.com/authenticate';
  private tokenKey = 'authToken';
  private currentUserEmailKey = 'currentUserEmail';

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem(this.currentUserEmailKey);
      this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    } else {
      this.currentUserSubject = new BehaviorSubject<any>(null);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Login method to authenticate user
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        console.log('Login response:', response);  // Log the response to check its content
        if (response && response.token) {
          this.storeToken(response.token);
          const user = { email: credentials.email };
          this.setCurrentUser(user);  // Store user in both BehaviorSubject and localStorage
        }
      })
    );
  }

  // Method to store JWT token in localStorage
  private storeToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  // Method to retrieve JWT token from localStorage
  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(this.tokenKey) : null;
  }

  // Method to check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Retrieve the current user's email
  getCurrentUserEmail(): string | null {
    const currentUser = this.currentUserSubject.value;
    console.log('Current user:', currentUser);  // Log current user to verify the email is set
    return currentUser ? currentUser.email : null;
  }

  // Set the current user and persist it
  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.currentUserEmailKey, JSON.stringify(user));
    }
  }

  // Logout the user and clear stored data
  logout(): void {
    this.currentUserSubject.next(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.currentUserEmailKey);
    }
  }
}*/


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://globalsumi-alb-1058295331.eu-north-1.elb.amazonaws.com/party-api/user/token';
  private tokenKey = 'authToken';
  private currentUserEmailKey = 'currentUserEmail';

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem(this.currentUserEmailKey);
      this.currentUserSubject = new BehaviorSubject<any>(
        storedUser ? JSON.parse(storedUser) : null
      );
    } else {
      this.currentUserSubject = new BehaviorSubject<any>(null);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Login method to authenticate user
  login(credentials: { email: string; password: string }): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', credentials.email.trim())    // email value sent as username to API
     //.set('username', 'Admin')
     .set('password', credentials.password.trim());
      console.log('Sending to API:', {
    username: credentials.email.trim(),
    password: credentials.password.trim(),
    grant_type: 'password'
  });
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(this.apiUrl, body.toString(), { headers }).pipe(
      tap(response => {
        console.log('Login response:', response);
        if (response && response.access_token) {
          this.storeToken(response.access_token);
          localStorage.setItem('refreshToken', response.refresh_token);
          const user = { email: credentials.email };
          this.setCurrentUser(user);
        }
      })
    );
  }

  // Method to store JWT token in localStorage
  private storeToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  // Method to retrieve JWT token from localStorage
  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(this.tokenKey) : null;
  }

  // Method to get auth headers for other API calls
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Method to check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Retrieve the current user's email
  getCurrentUserEmail(): string | null {
    const currentUser = this.currentUserSubject.value;
    console.log('Current user:', currentUser);
    return currentUser ? currentUser.email : null;
  }

  // Set the current user and persist it
  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.currentUserEmailKey, JSON.stringify(user));
    }
  }

  // Logout the user and clear stored data
  logout(): void {
    this.currentUserSubject.next(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.currentUserEmailKey);
      localStorage.removeItem('refreshToken');
    }
  }
}


