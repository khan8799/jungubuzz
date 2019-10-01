import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private auth: AuthService,
    private alertify: AlertifyService,
    private route: Router,
  ) { }

  ngOnInit() {
  }

  emailLogin() {
    const formData = this.emailForm.value;

    this.auth.emailLogin(formData).then(
      res => this.route.navigate(['/home']),
      err => {
        this.alertify.error(err.message);
        this.emailForm.reset();
      }
    );
  }

}
