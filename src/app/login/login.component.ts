import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { AppUser } from './../models/app-user';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  appUser: AppUser;

  constructor(
    private auth: AuthService,
    private alertify: AlertifyService
  ) { }

  socialLogin(socialLoginMethod: string) {
    this.auth.socialLogin(socialLoginMethod).then(
      res => console.log(res),
      err => this.alertify.error(err.message)
    );
  }

  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    });
  }

}
