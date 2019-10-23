import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaypalService } from 'src/app/services/paypal.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
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

  constructor(
    private paypalService: PaypalService,
    private alertifyService: AlertifyService,
    private authService: AuthService,
    private route: Router,
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

  refund(orderID: string) {
    this.orderID = orderID;
    alertify.confirm(
      'Refund/Cancel Order',
      'Are you sure you really want to initiate refund? This will also cancel your order.',
      () => {
        // Initiate refund
      },
      () => {
        // Do nothing
      }
    );
  }

}
