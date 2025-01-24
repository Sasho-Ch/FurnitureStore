import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, of, catchError } from 'rxjs';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();

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
      .post<UserForAuth>(
        'http://localhost:3000/users/login',
        { email, password },
        { withCredentials: true } 
      )
      .pipe(tap((user) => {
        console.log(user);
        this.user$$.next(user)}));
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
        })
      );
  }

  getProfile() {
    return this.http
      .get<UserForAuth>(
        `http://localhost:3000/users/profile`,
        { withCredentials: true } 
      )
      .pipe(
        tap((user) => {
          this.user$$.next(user);
        }),
        catchError(() => {
          this.user$$.next(null); 
          return of(null); 
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