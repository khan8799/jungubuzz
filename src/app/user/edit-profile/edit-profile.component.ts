import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserDetail } from 'src/app/models/user-detail';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/services/user.service';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
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

  userPicture: File;
  fileRef: AngularFireStorageReference;
  imageURL: string;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private alertify: AlertifyService,
    private ngxLoader: NgxUiLoaderService,
    private storage: AngularFireStorage,
  ) {
    this.ngxLoader.start('user-detail');
    this.auth.user$.subscribe(
      res => {
        this.user = res;
        this.getUserDetail();
      },
      err => {
        this.ngxLoader.stop('user-detail');
        this.alertify.error(err.message);
      }
    );
  }

  getUserDetail() {
    if (this.user) {
      this.userService.get(this.user.uid).valueChanges().subscribe(
        res => {
          this.userDetail = res;
          if (this.userDetail.photoURL !== '')
            this.imageURL = this.userDetail.photoURL;
          else
            this.imageURL = this.user.photoURL;
          this.ngxLoader.stop('user-detail');
          },
        err => {
          this.alertify.error(err.message);
          this.ngxLoader.stop('user-detail');
        }
      );
    }
  }

  editProfile() {
    this.ngxLoader.start('edit-profile');

    const formData = this.userEditProfileForm.value;

    this.userDetail = {
      uid:          this.user.uid,
      displayName:  this.user.displayName,
      email:        this.user.email,
      photoURL:     this.imageURL,
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
        this.ngxLoader.stop('edit-profile');
        this.alertify.success('Profile edited successfully !!!');
      },
      err => {
        this.ngxLoader.stop('edit-profile');
        this.alertify.error(err.message);
      }
    );
  }

  onFileInput(ev) {
    this.userPicture = ev.target.files[0];

    if (this.userPicture !== undefined) {
      this.ngxLoader.start('upload-image');
      this.uploadFile();
    }
  }

  uploadFile() {
    const userName  = this.user.email || this.user.phoneNumber;

    const filePath  = 'profile-pic/' + userName;
    this.fileRef    = this.storage.ref(filePath);
    const task      = this.storage.upload(filePath, this.userPicture);

    task.snapshotChanges().subscribe(
      res => res,
      err => {
        this.ngxLoader.stop('upload-image');
        this.alertify.error(err.message);
      },
      () => this.showUpdatedImage()
    );
  }

  showUpdatedImage() {
    this.fileRef.getDownloadURL().subscribe(
      res => {
        this.imageURL = res;
        this.updateImageURL();
      },
      err => {
        this.ngxLoader.stop('upload-image');
        this.alertify.error(err.message);
      }
    );
  }

  updateImageURL() {
    this.userDetail.photoURL = this.imageURL;
    this.userService.update(this.userDetail).then(
      res => {
        this.ngxLoader.stop('upload-image');
        this.alertify.success('Profile picture changed successfully !!!');
      },
      err => {
        this.ngxLoader.stop('upload-image');
        this.alertify.error(err.message);
      }
    );
  }

  checkExist() {
    this.ngxLoader.start('check-exist');
    const phone = this.userEditProfileForm.value.phoneNumber;
    this.userService.checkExist('phoneNumber', phone).subscribe(
      res => {
        console.log(res);
        if (res.length > 0) {
          this.ngxLoader.stop('check-exist');
          this.alertify.error('OOPS!!! This ' + phone + ' mobile number is already in use by another user');
        } else {
          this.editProfile();
        }
      },
      err => {
        this.ngxLoader.stop('check-exist');
        this.alertify.error(err.message);
      }
    );
  }

}
