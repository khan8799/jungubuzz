import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertifyService } from './services/alertify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jungubuzz';
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
    private alertify: AlertifyService,
  ) {
    this.ngxLoader.start();
    this.auth.user$.subscribe(
      user => {
        this.ngxLoader.stop();
        if (!user) return;

        this.userService.checkUserExist(user.uid).subscribe(
          userExist => {
            if (!userExist) this.userService.create(user);
          },
          err => this.alertify.error(err.message)
        );

        const returnUrl = localStorage.getItem('returnUrl');

        if (!returnUrl) return;

        localStorage.removeItem('returnUrl');
        this.router.navigate([returnUrl]);
      },
      err => this.alertify.error(err.message)
    );
  }
}
