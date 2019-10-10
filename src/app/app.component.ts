import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
  ) {
    this.ngxLoader.start();
    this.auth.user$.subscribe(user => {
      if (!user) {
        this.ngxLoader.stop();
        return;
      }

      this.userService.checkUserExist(user.uid).subscribe(
        userExist => {
          if (!userExist)
            this.userService.create(user);
        },
        err => console.log(err)
      );

      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) {
        this.ngxLoader.stop();
        return;
      }

      this.ngxLoader.stop();
      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
    });
  }
}
