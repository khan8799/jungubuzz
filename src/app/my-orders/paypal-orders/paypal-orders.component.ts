import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaypalService } from 'src/app/services/paypal.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare let alertify: any;

@Component({
  selector: 'app-paypal-orders',
  templateUrl: './paypal-orders.component.html',
  styleUrls: ['./paypal-orders.component.scss']
})
export class PaypalOrdersComponent implements OnInit {
  orders;
  userID: string;
  orderID: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer A21AAFvJGkVigFrFIAGDQBY_oui8Lm4oFAm96icEvjAd-G6gfY-TTvqEoGdEZ5akJ6EDdTgJyQROaQcWOsYnqrg1alNBqojRw'
    })
  };

  constructor(
    private paypalService: PaypalService,
    private alertifyService: AlertifyService,
    private authService: AuthService,
    private route: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.authService.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        try {
          this.userID = user.uid;

          this.paypalService.getOrders(this.userID).subscribe(
            (item: any) => {
              this.orders = item.filter(ut => {
                if (ut.payerID)
                  return true;
              });
            },
            err => this.alertifyService.error(err)
          );
        } catch (error) {
          this.alertifyService.error(error);
        }
      }
    });
  }

  getCaptureID() {
    
  }

  refund(orderID: string) {
    const url = 'https://api.sandbox.paypal.com/v2/checkout/orders/3BM43710EY4202631';

    this.orderID = orderID;
    alertify.confirm(
      'Refund/Cancel Order',
      'Are you sure you really want to initiate refund? This will also cancel your order.',
      () => {
        // Initiate refund
        this.http.get(url, this.httpOptions).subscribe(
          res => console.log(res),
          err => console.log(err)
        );
      },
      () => {
        // Do nothing
      }
    );
  }

}
