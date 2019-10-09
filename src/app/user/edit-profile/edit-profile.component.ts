import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { UserDetail } from 'src/app/models/user-detail';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  userEditProfileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl({value: '', disabled: true}),
    phoneNumber: new FormControl(''),
    gender: new FormControl('Male'),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
  });

  user: firebase.User;
  userDetail: UserDetail;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private alertify: AlertifyService,
    private route: Router,
    private ngxLoader: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    this.ngxLoader.start();
    this.auth.user$.subscribe(
      res => {
        this.user = res;
        this.getUserDetail();
        this.ngxLoader.stop();
      },
      err => {
        this.ngxLoader.stop();
        this.alertify.error(err.message);
        this.route.navigate(['/home']);
      }
    );
  }

  getUserDetail() {
    if (this.user) {
      this.userService.get(this.user.uid).valueChanges().subscribe(
        res => this.userDetail = res,
        err => this.alertify.error(err.message)
      );
    }
  }

  editProfile() {
    this.ngxLoader.start();
    const formData = this.userEditProfileForm.value;

    this.userDetail = {
      uid:          this.user.uid,
      displayName:  this.user.displayName,
      email:        this.user.email,
      photoURL:     this.user.photoURL,
      isAdmin:      this.userDetail.isAdmin,
      name:         formData.name ? formData.name : this.userDetail.name,
      phoneNumber:  formData.phoneNumber ? formData.phoneNumber : this.userDetail.phoneNumber,
      gender:       formData.gender ? formData.gender : this.userDetail.gender,
      address:      formData.address ? formData.address : this.userDetail.address,
      city:         formData.city ? formData.city : this.userDetail.city,
      state:        formData.state ? formData.state : this.userDetail.state,
      zip:          formData.zip ? formData.zip : this.userDetail.zip,
    };

    this.userService.update(this.userDetail).then(
      res => {
        this.alertify.success('Profile edited successfully !!!');
        this.ngxLoader.stop();
      },
      err => {
        this.alertify.error(err.message);
        this.ngxLoader.stop();
      }
    );
  }

  onFileInput(ev) {
    console.log('clicked');
  }

}
