import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.scss']
})
export class PhoneLoginComponent implements OnInit {
  appUser;
  ui: firebaseui.auth.AuthUI;

  constructor(
    private auth: AuthService,
    private alertify: AlertifyService,
    private route: Router,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    const uiConfig = {
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: 'IN',
        }
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccess.bind(this)
      }
    };

    this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);

    this.ui.start('#firebaseUiContainer', uiConfig);
  }

  onLoginSuccess() {
    this.auth.appUser$.subscribe(
      appUser => {
        console.log(appUser);
        this.appUser = appUser;
        this.alertify.success('You have successfully logged in!!!');
        this.route.navigate(['/home']);
      },
      err => this.alertify.error(err)
    );

  }

  // phoneForm = new FormGroup({
  //   phone: new FormControl('', [Validators.required]),
  // });
  // recaptchaVerifier;
  // msgSent     = false;
  // phoneInput  = true;

  // ngOnInit() {
  //   this.recaptchaVerifier = this.auth.captcha('recaptcha-container');
  // }

  // phoneLogin() {
  //   const formData = this.phoneForm.value;

  //   this.auth.phoneLogin(formData, this.recaptchaVerifier).then((confirmationResult) => {
  //     this.phoneInput     = false;
  //     this.msgSent        = true;
  //     const verification  = prompt('Enter verification code');

  //     if (verification != null) {
  //       console.log(verification);
  //       confirmationResult.confirm(verification).then(
  //         res => this.alertify.error('You have successfully logged in')
  //       )
  //       .catch(err => this.alertify.error(err));
  //     } else {
  //       this.alertify.error('ERROR: No verification code entered');
  //       this.phoneForm.reset();
  //     }

  //   })
  //   .catch(err => this.alertify.error(err));
  // }

}
