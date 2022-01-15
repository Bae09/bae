import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Data } from '../interface/data';

@Injectable({
  providedIn: 'root'
})
export class DatastreamService {
  user = {
    email: '',
    FullName:{
      firstName:'',
      secondName: '',
      lastName: '',
    },
    sucess: '',
    token: '',
    username:'',
    isLogged:false,
  }
  public datastream: BehaviorSubject<any>;
  public userLogined:BehaviorSubject<boolean>;

  getDataStream(){
    return this.user;
  }

  setUser(state:any){
    this.user = state;
    this.user.isLogged = true;
  }

  constructor() { }
}
