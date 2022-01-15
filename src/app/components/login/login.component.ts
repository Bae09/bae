import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { DatastreamService } from '../../service/datastream.service';
import { User } from '../../interface/user';
import { Data } from '../../interface/data';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  key = '';
  loginsuccess:boolean;
  loginForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      keyIndex: new FormControl(''),
      loginType: new FormControl('EMAIL'),
    })

  public loginError:String;
  constructor(private configService: LoginService, private datastreamservice: DatastreamService, private router:Router) { }

  ngOnInit(): void { }

  onSubmit(){
    this.configService.preLoginApi().subscribe((data:User) =>{
        this.configService.loginApi(this.loginForm.value, data.key_index)
        .subscribe((da) => {
          if(da.success){
                this.datastreamservice.datastream = da;
                this.loginsuccess = da.success;
                this.router.navigate(['/home']);
              }
            },
            error => console.log(error)
           )
         },
          error => console.log(error)
        )
      // debugger;
      //
    }

}
