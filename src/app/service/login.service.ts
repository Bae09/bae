import { Injectable } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { User } from '../interface/user';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private configUrl = 'http://ec2-3-85-98-127.compute-1.amazonaws.com:8080/api/auth/login';
  private prelink_login = 'http://ec2-3-85-98-127.compute-1.amazonaws.com:8080/api/auth/prelogin';


  constructor(private httpClient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

  preLoginApi(){
    return this.httpClient.get<User>(this.prelink_login).pipe(retry(3), tap((res:User) => {
      console.log(res.key_index)
    })
  );
  }

  loginApi(formData: any,key:any ){
    //this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'my-new-auth-token');
    formData.key_index = key;
    return this.httpClient.post(this.configUrl, formData)
      .pipe(tap(resp => {
         resp;
    		})
      );
  }
}
