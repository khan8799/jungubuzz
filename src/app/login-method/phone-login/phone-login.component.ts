import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.scss']
})
export class PhoneLoginComponent implements OnInit {
  phoneForm = new FormGroup({
    phone: new FormControl('', [Validators.required]),
  });
  recaptchaVerifier;
  msgSent     = false;
  phoneInput  = true;

  constructor(
    private auth: AuthService,
    private alertify: AlertifyService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.recaptchaVerifier = this.auth.captcha('recaptcha-container');
  }

  phoneLogin() {
    const formData = this.phoneForm.value;

    this.auth.phoneLogin(formData, this.recaptchaVerifier).then((confirmationResult) => {
      this.phoneInput     = false;
      this.msgSent        = true;
      const verification  = prompt('Enter verification code');

      if (verification != null) {
        console.log(verification);
        confirmationResult.confirm(verification).then(
          res => this.alertify.error('You have successfully logged in')
        )
        .catch(err => this.alertify.error(err));
      } else {
        this.alertify.error('ERROR: No verification code entered');
        this.phoneForm.reset();
      }

    })
    .catch(err => this.alertify.error(err));
  }

}
