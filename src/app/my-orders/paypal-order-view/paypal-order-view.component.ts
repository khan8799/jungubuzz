import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaypalService } from 'src/app/services/paypal.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-paypal-order-view',
  templateUrl: './paypal-order-view.component.html',
  styleUrls: ['./paypal-order-view.component.scss']
})
export class PaypalOrderViewComponent implements OnInit {
  orderList;
  orderID: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private paypalService: PaypalService,
    private alertifyService: AlertifyService,
  ) { }

  ngOnInit() {
    this.orderID = this.activeRoute.snapshot.paramMap.get('orderID');

    this.paypalService.getOrderByID(this.orderID).valueChanges().subscribe(
      order => {
        console.log(order);
        this.orderList = order;
      },
      err => this.alertifyService.error(err)
    );

  }

}
