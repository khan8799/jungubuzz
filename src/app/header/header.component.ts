import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  appUser: AppUser;

  constructor(
    public auth: AuthService,
    private alertify: AlertifyService,
    private router: Router,
  ) { }

  logout() {
    this.auth.logout().then(
      res => {
        this.alertify.success('You have successfully logged out !!!');
        this.router.navigate(['/login']);
      },
      err => this.alertify.error(err)
    );
  }

  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

}
