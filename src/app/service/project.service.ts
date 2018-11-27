import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Project} from '../model/project';
import {ShortProject} from '../model/short-project';

@Injectable()
export class ProjectService {
  private apiBase = '/api/projects';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ShortProject[]> {
    return this.http
      .get<Project[]>(this.apiBase)
      .pipe(
        catchError(this.handleError)
      );
  }

  get(id: string): Observable<Project> {
    return this.http
      .get<Project>(`${this.apiBase}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: string) {
    return this.http
      .delete<Project>(`${this.apiBase}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(book: Project) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<Project>(this.apiBase, book)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(id: string, book: Project) {
    return this.http
      .put<Project>(`${this.apiBase}/${id}`, book)
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
