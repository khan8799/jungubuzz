import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  private PAYPAL_CLIENT         = 'AYLohRnEGAYmm7soRUUwFxaM7x0hKRjL-S2T3Aw2PqSmntFx-WmfU43cYmRd2KYujXyp5IMc-1dQbdFn';
  private PAYPAL_SECRET         = 'ELtBiHIZIIYKdfan-CTSf2sRFNJDjm8ZstMgEB_OsOk_3v8XGmhXu-2fq03oGAusBFjKjCut-54yOvkn';
  private PAYPAL_TOKEN_URL      = 'https://api.sandbox.paypal.com/v1/';
  private PAYPAL_URL            = 'https://api.sandbox.paypal.com/v2/';
  private PAYPAL_ACCESS_TOKEN: string;

  private httpOptions     = {
    headers: new HttpHeaders({
      Accept:         `application/json`,
      'Content-Type': 'application/json',
    })
  };

  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient,
    private ngxLoader: NgxUiLoaderService,
  ) { }

  getAccessToken() {
    const basicAuth   = btoa(`${ this.PAYPAL_CLIENT }:${ this.PAYPAL_SECRET }`);
    const httpOptions = {
      headers: {
        Accept:        `application/json`,
        Authorization: `Basic ${ basicAuth }`,
      },
    };

    const httpRequest = {
      method: 'POST',
      url: this.PAYPAL_TOKEN_URL + 'oauth2/token',
      body: 'grant_type=client_credentials',
      httpOptions
    };

    return this.callApi(httpRequest);
  }

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
    this.ngxLoader.start();
    const refundURL = '';
    return this.getAccessToken().subscribe(
      (res: any) => {
        console.log(res.access_token);
        this.PAYPAL_ACCESS_TOKEN = res.access_token;
        this.ngxLoader.stop();

        // Refund start
      },
      (err) => err
    );
  }

  private callApi(httpReq) {
    if (httpReq.method === 'POST')
      return this.http.post(httpReq.url, httpReq.body, httpReq.httpOptions);
    else if (httpReq.method === 'GET')
      return this.http.get(httpReq.url, httpReq.httpOptions);
  }

}
