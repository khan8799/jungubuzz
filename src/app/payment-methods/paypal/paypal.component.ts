import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {
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
        value: '1',
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

  ngOnInit(): void {
    this.initConfig();
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
              value: '2',
              breakdown: {
                item_total: {
                  currency_code: 'INR',
                  value: '2'
                }
              }
            },
            items: this.order
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        color: 'blue'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
