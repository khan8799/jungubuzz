import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { filter } from 'minimatch';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer A21AAFvJGkVigFrFIAGDQBY_oui8Lm4oFAm96icEvjAd-G6gfY-TTvqEoGdEZ5akJ6EDdTgJyQROaQcWOsYnqrg1alNBqojRw'
    })
  };
  paypalURL = 'https://api.sandbox.paypal.com/v2/checkout/orders/3BM43710EY4202631';

  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient,
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

  initiateRefund() {
    return this.http.get(this.paypalURL, this.httpOptions);
  }

}
