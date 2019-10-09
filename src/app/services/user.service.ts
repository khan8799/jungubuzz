import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { AppUser } from '../models/app-user';
import { UserDetail } from '../models/user-detail';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  size$: BehaviorSubject<string|null>;

  constructor(private db: AngularFireDatabase) { }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      displayName: user.displayName,
      email: user.email,
      isAdmin: false,
    });
  }

  update(userData: UserDetail): Promise<any> {
    return this.db.object('/users/' + userData.uid).update(userData);
  }

  checkExist(feild: string, value: string) {
    this.size$ = new BehaviorSubject(null);
    return this.size$.pipe(
      switchMap(
        size => this.db.list('/users/', ref => ref.orderByChild(feild).equalTo(value.toString()))
        .snapshotChanges()
      )
    );
  }
}
