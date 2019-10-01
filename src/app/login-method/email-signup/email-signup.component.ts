import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-signup',
  templateUrl: './email-signup.component.html',
  styleUrls: ['./email-signup.component.scss']
})
export class EmailSignupComponent implements OnInit {

  emailSignupForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required]),
  });

  constructor(
    private auth: AuthService,
    private alertify: AlertifyService,
    private route: Router,
  ) { }

  ngOnInit() {
  }

  emailSignup() {
    const formData = this.emailSignupForm.value;
    this.emailSignupForm.reset();

    this.auth.emailSignup(formData).then(
      res => {
        this.alertify.success('Account has created successfully');
        this.route.navigate(['/email-login']);
      },
      err => {
        this.alertify.error(err.message);
      }
    );
  }

  // All is this method
  onPasswordChange() {
    if (this.confirm_password.value === this.password.value) {
      this.confirm_password.setErrors(null);
    } else {
      this.confirm_password.setErrors({ mismatch: true });
    }
  }

  // getting the form control elements
  get password(): AbstractControl {
    return this.emailSignupForm.controls.password;
  }

  get confirm_password(): AbstractControl {
    return this.emailSignupForm.controls.confirm_password;
  }

}
