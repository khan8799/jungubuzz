import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paypal-orders',
  templateUrl: './paypal-orders.component.html',
  styleUrls: ['./paypal-orders.component.scss']
})
export class PaypalOrdersComponent implements OnInit {
  message = '';
  dtOptions: DataTables.Settings = {};

  constructor() { }

  someClickHandler(info: any): void {
    this.message = info.id + ' - ' + info.firstName;
  }

  ngOnInit() {
    this.dtOptions = {
      // tslint:disable-next-line: ban-types
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // tslint:disable-next-line: deprecation
        $('td', row).unbind('click');
        // tslint:disable-next-line: deprecation
        $('td', row).bind('click', () => {
          self.someClickHandler(data);
          console.log(row);
          console.log(data);
          console.log(index);
        });
        return row;
      }
    };
  }

}
