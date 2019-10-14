import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    public afAuth: AngularFireAuth,
    public route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = this.afAuth.authState;
  }

  private setReturnUrl() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'; // get current url from urlBar
    localStorage.setItem('returnUrl', returnUrl);
  }

  socialLogin(socialLoginMethod: string) {
    this.setReturnUrl();
    if (socialLoginMethod === 'google')
      return this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    else if (socialLoginMethod === 'facebook')
      return this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()).catch(err => console.log(err));
    else if (socialLoginMethod === 'twitter')
      return  this.afAuth.auth.signInWithRedirect(new firebase.auth.TwitterAuthProvider());
  }

  emailLogin(data) {
    return this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password);
  }

  emailSignup(data) {
    return this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  captcha(captchaContainer: string) {
    return new firebase.auth.RecaptchaVerifier(captchaContainer);
  }

  phoneLogin(data, captchaVerifier) {
    return this.afAuth.auth.signInWithPhoneNumber(data.phone, captchaVerifier);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(
        switchMap(user => {
          if (user)
            return this.userService.get(user.uid).valueChanges();
          else
            return of(null);
        })
      );
  }
}
