import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { User } from '../../interface/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  key = '';
  loginForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      key_index: new FormControl(''),
    })

  public loginError:String;
  constructor(private configService: LoginService) { }

  ngOnInit(): void { }

  onSubmit(){
    this.configService.preLoginApi().subscribe((data:User) =>{ 
         debugger;
        this.configService.loginApi(this.loginForm.value, data.key_index)
        .subscribe((da) => {
            console.log(da)
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
