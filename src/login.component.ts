import { Component, OnInit,ViewChild} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AppService } from './app.service'
import { User } from './model/user';
import { Error } from './model/error';

import { CO } from './model/co';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: 'src/login.component.html',
})

export class LoginComponent implements OnInit{
  co: CO = new CO();

  err:Error = new Error();
  nav: string = 'login';
  user: User = new User();
  confirmPassword = '';

  constructor(private services: AppService) { };
    @ViewChild('errorModal') public errorModal:ModalDirective;

  ngOnInit(){
    this.services.getUser().then(co => {
			if(this.services.isLogged())
      			this.services.router.navigate(['']);
		});
  }

  login() {
    if (this.user.password && this.user.password != '' && this.user.email && this.user.email != '') 
      this.services.login(this.user).then(co => {this.co = co;
      if(co.err)
        this.errorModal.show();
  });
    else{
      this.co.err = { code: 'CHANNEL_VALIDATION', msg: "Must complete user and password" };
      this.errorModal.show();
    }
  }

  forgotPassword() {
    if (this.user.email != '') 
      this.services.forgotPassword(this.user).then(co => this.co);
    else{
      this.co.err = { code: 'CHANNEL_VALIDATION', msg: "Must complete email" };
      this.errorModal.show();
    }
    
  }

  signIn() {
    if (this.user.email && this.user.email != '' && this.user.password == this.confirmPassword) {
      this.services.signIn(this.user).then(co => {this.co = co;
      if(co.err)
        this.errorModal.show();
  });
    }
    else {
      if (!this.user.email || this.user.email == '')
        this.co.err = {code: 'CHANNEL_VALIDATION',  msg: "Must complete email" };
      if (this.user.password != this.confirmPassword)
        this.co.err = {code: 'CHANNEL_VALIDATION',  msg: "Wrong password confirmation" };

        this.errorModal.show();
    }
  }

}
