import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  LoginTime: Date;
  LoginForm: FormGroup;
  hide: boolean = true;
  constructor(private _route: Router) { }


  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      u_EmailId: new FormControl(null, [Validators.required, Validators.email]),
      u_password: new FormControl(null, [Validators.required])
    });
    this.LoginTime = new Date();

  }
  onLogin() {
    if (this.LoginForm.get('u_EmailId').value != null && this.LoginForm.get('u_password').value != null) {

      localStorage.setItem('u_EmailId', this.LoginForm.get('u_EmailId').value);
      this._route.navigate(['nav/Dashboard/']);
      console.log('success');
      localStorage.setItem('LoginTime', this.LoginTime.getHours() + ':' + this.LoginTime.getMinutes() + ':' + this.LoginTime.getSeconds());
    }
    else {
      console.log('error');
    }
  }
}


