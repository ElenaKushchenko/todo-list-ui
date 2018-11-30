import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {throwError as observableThrowError} from "rxjs";
import {catchError} from "rxjs/operators";
import {User} from "../model/user";

@Injectable()
export class UserService {
  private apiBase = '/api/users';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http
      .get<Array<User>>(this.apiBase)
      .pipe(
        catchError(this.handleError)
      );
  }

  get(id: string) {
    return this.http
      .get(`${this.apiBase}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(user: User) {
    return this.http
      .post(`${this.apiBase}`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(id: string, user: User) {
    return this.http
      .put(`${this.apiBase}/${id}`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: string) {
    return this.http
      .delete(`${this.apiBase}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(res: HttpErrorResponse | any) {
    let errMsg = (res.message) ? res.message : 'Server error';
    console.error(res.error || res.body.error);
    return observableThrowError(errMsg);
  }
}
