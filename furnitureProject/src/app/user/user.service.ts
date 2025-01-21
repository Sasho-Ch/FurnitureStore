import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
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
    this.user$.subscribe((user) => {
      this.user = user;
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
}
