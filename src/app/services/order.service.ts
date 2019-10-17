import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderID: string;
  payerID: string;
  intent: string;

  constructor(
    private db: AngularFireDatabase
  ) { }

  saveOrder(orderDetail): Promise<any> {
    this.orderID  = orderDetail.orderID;
    this.payerID  = orderDetail.payerID;
    this.intent   = orderDetail.intent;
    return this.db.object('/orders/' + orderDetail.orderID).set(orderDetail);
  }

  updateOrder(updateOrderDetail): Promise<any> {
    return this.db.object('/orders/' + this.orderID).update(updateOrderDetail);
  }
}
