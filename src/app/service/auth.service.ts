import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from "../model/user";

@Injectable()
export class AuthService {
  private apiBase = '/api';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    const options = {responseType: 'text' as 'json'};
    return this.http
      .post<string>(`${this.apiBase}/auth`, {username: username, password: password}, options)
      .pipe(
        map(token => {
          if (token) {
            let user = new User(username, token);

            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);

            return user;
          }
        }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(user: any) {
    const options = {responseType: 'text' as 'json'};
    return this.http
      .post<string>(`${this.apiBase}/register`, user, options)
      .pipe();
  }
}
