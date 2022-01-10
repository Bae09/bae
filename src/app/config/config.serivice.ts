import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../interface/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private configUrl = ' ';

  constructor(private httpClient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };


  loginApi(user: User): Observable<User> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.httpClient.post<User>(this.configUrl, user, this.httpOptions)
      .pipe(
        catchError(err => {
          throw 'error in source. Details: ' + err;
        })
      );
  }
}
