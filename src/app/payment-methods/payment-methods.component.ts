import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit {

  constructor(
    private route: Router,
  ) { }

  ngOnInit() {
  }

  paymentMethods(path: string) {
    this.route.navigate([path]);
  }

}
