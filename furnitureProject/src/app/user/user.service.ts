import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, of, catchError, throwError } from 'rxjs';
import { ProfileDetails, User, UserForAuth } from '../types/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  user$ = this.user$$.asObservable();

  USER_KEY = '[user]';
  user: UserForAuth | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    if (this.isLocalStorageAvailable()) {
      const savedUser = localStorage.getItem(this.USER_KEY);
      if (savedUser) {
        this.user = JSON.parse(savedUser);
        this.user$$.next(this.user);
      }
    }

    this.user$.subscribe((user) => {
      this.user = user;
      if (this.isLocalStorageAvailable()) {
        if (user) {
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        } else {
          localStorage.removeItem(this.USER_KEY);
        }
      }
    });
  }

  register(
    username: string,
    email: string,
    tel: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<UserForAuth>(
        `http://localhost:3000/users/register`,
        {
          username,
          email,
          tel,
          password,
          rePassword,
        },
        {
          withCredentials: true, 
        }
      )
      .pipe(tap((user) => this.user$$.next(user)));
  }

  login(email: string, password: string) {
    return this.http
  .post<UserForAuth>('http://localhost:3000/users/login', 
    { email, password }, 
    { withCredentials: true } 
  )
  .pipe(
    tap((user) => {
      this.user$$.next(user);
    })
  );
  }

  getUserInfo(id: string) {
    return this.http.get<User>(`http://localhost:3000/users/${id}`, {withCredentials: true})
  }

  logout() {
    return this.http
      .post(
        'http://localhost:3000/users/logout',
        {},
        { withCredentials: true } 
      )
      .pipe(
        tap((user) => {
          this.user$$.next(null);
          localStorage.removeItem(this.USER_KEY);
        })
      );
  }

  getProfile() {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .get<UserForAuth>('http://localhost:3000/users/profile', httpOptions)
      .pipe(
        tap((response) => {
          console.log('Profile fetched successfully:', response);
          this.user$$.next(response);
        }),
        catchError((error) => {
          console.error('Profile Fetch Error:', error);
          this.user$$.next(null);
          return of(null);
        })
      );
  }

  editProfile(updatedProfile: Partial<UserForAuth>) {
    return this.http
      .put<UserForAuth>('http://localhost:3000/users/profile', updatedProfile, { withCredentials: true })
      .pipe(
        tap((updatedUser) => {
          this.user$$.next(updatedUser);
          
        }),
        catchError((error) => {
          console.error('Profile Update Error:', error);
          return throwError(() => error);
        })
      );
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}