import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  appUser: AppUser;

  constructor(public auth: AuthService, private router: Router) { }

  logout() {
    this.auth.logout().then(
      res => this.router.navigate(['/login']),
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

}
