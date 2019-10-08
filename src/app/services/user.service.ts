import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AppUser } from '../models/app-user';
import { UserDetail } from '../models/user-detail';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      isAdmin: false,
    });
  }

  update(userData: UserDetail): Promise<any> {
    return this.db.object('/users/' + userData.uid).update(userData);
  }
}
