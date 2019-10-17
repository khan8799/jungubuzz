import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest, IOnApproveCallbackData } from 'ngx-paypal';
import { OrderService } from 'src/app/services/order.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { getCurrencySymbol } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {
  public orderID: string;
  public payerID: string;
  public status: string;
  public userID: string;
  public fundingSource: string;

  public payPalConfig?: IPayPalConfig;
  private clientId = 'AYLohRnEGAYmm7soRUUwFxaM7x0hKRjL-S2T3Aw2PqSmntFx-WmfU43cYmRd2KYujXyp5IMc-1dQbdFn';
  private currencyCode = 'INR';
  private order = [
    {
      name: 'Bugatti Shoes',
      quantity: '1',
      category: 'DIGITAL_GOODS',
      unit_amount: {
        currency_code: 'INR',
        value: '2',
      },
    },
    {
      name: 'Levis Jeans',
      quantity: '1',
      category: 'DIGITAL_GOODS',
      unit_amount: {
        currency_code: 'INR',
        value: '1',
      },
    }
  ];

  constructor(
    private orderService: OrderService,
    private alertifyService: AlertifyService,
    private authService: AuthService,
    private route: Router,
  ) {
  }

  ngOnInit(): void {
    this.authService.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        try {
          this.userID = user.uid;
          this.initConfig();
        } catch (error) {
          this.alertifyService.error(error);
        }
      }
    });
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: this.currencyCode,
      clientId: this.clientId,
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units:  [
          {
            amount: {
              currency_code: 'INR',
              value: '3',
              breakdown: {
                item_total: {
                  currency_code: 'INR',
                  value: '3'
                }
              }
            },
            items: this.order,
            payee: { email_address: 'farman@seller.com' }
          }
        ]
      },
      advanced: { commit: 'true' },
      style: {
        label: 'paypal',
        layout: 'vertical',
        color: 'blue'
      },
      onApprove: (data: IOnApproveCallbackData, actions) => {
        this.approvedOnly(data);

        actions.order.get().then(details => {
          this.approvedAndAuthorised(details);
        });
      },
      onClientAuthorization: (data) => {
        this.clientAuthorization(data);
      },
      onCancel: (data, actions) => {
        this.cancelPayment();
      },
      onError: err => {
        this.route.navigate(['/payment-methods']);
        // this.errorOccured(err);
      },
      onClick: (data, actions) => {
        console.log('onClick');
        this.fundingSource = data.fundingSource;

        actions.reject();
      },
    };
  }


  /*
  | User has cancelled the payment
  */
  cancelPayment() {
    this.alertifyService.error('OOPS !!! You have cancelled the payment, Please click on PAY NOW to complete your transaction again.');
  }


  /*
  | Error occured
  | - Handle the error very carefully with proper message to the user
  */
  errorOccured(err: string) {
    // try {
    //   this.alertifyService.error(err);
    // } catch (err) {
    //   this.alertifyService.error(err);
    // }

    this.route.navigate(['/payment-methods']);
  }


  /*
  | User is Approved
  | - we can get orderID & payerID here
  */
  approvedOnly(data: IOnApproveCallbackData) {
    this.orderID = data.orderID;
    this.payerID = data.payerID;
  }


  /*
  | User is Approved & Authorised but Payment is pending
  | - we can get full order details here
  */
  approvedAndAuthorised(details: any) {
    const STATUS    = details.status;
    const ORDER_ID  = details.id;
    const PAYER_ID  = details.payer.payer_id;

    if (STATUS === 'APPROVED') {
      if (ORDER_ID === this.orderID && PAYER_ID === this.payerID) {
        // Everything is correct - store order information on server
        const orderDetails = {
          userID:     this.userID,
          orderID:    details.id,
          payerID:    details.payer.payer_id,
          status:     details.status,
          createdOn:  details.create_time,
          intent:     details.intent,
          fundingSource: this.fundingSource,
        };

        try {
          this.orderService.saveOrder(orderDetails)
          .then(
            res => console.log('Order has been saved successully'),
            err => this.alertifyService.error(err.message)
          )
          .catch(err => this.alertifyService.error(err.message));
        } catch (err) {
          this.alertifyService.error(err.message);
        }
      }
    }
  }


  /*
  | Payment has been made successfully
  | - update order status & information into the database
  | - show payment successfull message to the user
  */
  clientAuthorization(details) {
    const STATUS    = details.status;
    const ORDER_ID  = details.id;
    const PAYER_ID  = details.payer.payer_id;
    const INTENT    = details.intent;

    if (
      ORDER_ID  === this.orderService.orderID &&
      PAYER_ID  === this.orderService.payerID &&
      STATUS    === 'COMPLETED' &&
      INTENT    === this.orderService.intent
    ) {
      // Store data on server & show payment successfull message with order id to user
      const name = details.payer.name;
      const data = details.purchase_units[0];

      const updateOrderDetails = {
        updateTime: details.update_time,
        status: details.status,
        payerEmail: details.payer.email_address,
        payerName: name.given_name + ' ' + name.surname,
        itemPurchased: data.items,
        shippingAddress: data.shipping.address,
        totalAmount: data.amount.value,
      };

      try {
        this.orderService.updateOrder(updateOrderDetails)
        .then(
          res => {
            const currencySymbol = getCurrencySymbol(this.currencyCode, 'narrow');
            // tslint:disable-next-line: max-line-length
            const msg = `You have successfully made the payment of ${currencySymbol} ${updateOrderDetails.totalAmount} ${this.currencyCode}, please save your order id ${this.orderID} for your future reference`;

            this.alertifyService.success(msg);
          },
          err => this.alertifyService.error(err)
        )
        .catch(err => this.alertifyService.error(err)
      );
      } catch (error) {
        this.alertifyService.error(error);
      }
    }
  }

}
