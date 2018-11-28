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

  getAll(): Observable<Array<ShortProject>> {
    return this.http
      .get<Array<ShortProject>>(this.apiBase)
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
      .delete(`${this.apiBase}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(project: Project): Observable<String> {
    return this.http
      .post<String>(this.apiBase, project)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateAll(projects: Array<ShortProject>) {
    return this.http
      .put(this.apiBase, projects)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(id: string, book: Project) {
    return this.http
      .put(`${this.apiBase}/${id}`, book)
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
