import { Injectable } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { User } from '../interface/user';
import { RequestObject } from '../interface/RequestObject';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { DatastreamService } from './datastream.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private configUrl = 'http://ec2-3-85-98-127.compute-1.amazonaws.com:8080/bookatease/api/auth';
  private userLogined;

   requestedobject = ({
    'version':'v1',
    'requestType': 'CREATE',
    'pageNo': 0,
    'pageSize': 10,
    'userData': '',
    'object': '',
  });
  private token:string;

  constructor(private httpClient: HttpClient, private datastreamService:DatastreamService) { }


  preLoginApi(){
    return this.httpClient.get<User>(this.configUrl.concat('/prelogin')).pipe(retry(3), tap((res:User) => {
      console.log(res)
      })
    );
  }

  loginApi(loginData: any,key:any ){
    //this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'my-new-auth-token');
    loginData.keyIndex = key;
    const httpOptions = new HttpHeaders({ 'Content-Type':  'application/json', 'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': '*','Access-Control-Allow-Headers': '*'});
    return this.httpClient.post(this.configUrl.concat('/login'), loginData, { headers: httpOptions })
      .pipe(tap((resp:any) => {
        if(resp.success){
            this.token=resp.token;
            this.datastreamService.setUser(resp);
          }
    		})
      );
    }

    registerApi( signupData: any){
      this.requestedobject.object= signupData
      // const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', Authorization: this.token });
      const httpOptions = new HttpHeaders({ 'Content-Type':  'application/json', 'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': '*','Access-Control-Allow-Headers': '*', 'Authorization': "Bearer " + this.token });
      return this.httpClient.post(this.configUrl.concat('/signup'), this.requestedobject, { headers: httpOptions })
        .pipe(tap((resp:any) => {
          this.datastreamService.datastream= resp;
      		})
        );
    }
}
