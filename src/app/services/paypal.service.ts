import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { filter } from 'minimatch';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor(
    private db: AngularFireDatabase,
  ) { }

  getOrders(userID) {
    return this.db.list('/orders/', ref => ref.orderByChild('userID').equalTo(userID.toString())).snapshotChanges().pipe(
      map(changes =>
        changes.map(
          c => ({
            key: c.payload.key,
            ...c.payload.val()
          })
        )
      )
    );
  }

  getOrderByID(orderID: string) {
    return this.db.object('/orders/' + orderID);
  }

}
