import { Component } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { AppUser } from './../models/app-user';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  appUser: AppUser;

  constructor(
    private auth: AuthService,
    private alertify: AlertifyService,
    private route: Router,
  ) { }

  socialLogin(socialLoginMethod: string) {
    this.auth.socialLogin(socialLoginMethod)
    .then(
      res => console.log(res),
      err => this.alertify.error(err.message)
    )
    .catch(
      err => this.alertify.error(err.message)
    );
  }

}
