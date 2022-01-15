import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService } from '../../service/login.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    fullName: new FormGroup ({
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    }),
    isActive: new FormControl('true'),
  })

    constructor(private configService: LoginService) { }

    ngOnInit() {}

    onRegister(){
      this.configService.registerApi(this.signup.value).subscribe((data:any) => {
        console.log('registered');
      },
      error => console.log(error)
      )
    }
}
