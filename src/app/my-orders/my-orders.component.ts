import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  constructor(
    private route: Router,
  ) { }

  ngOnInit() {
  }

  navigate(path: string) {
    this.route.navigate([path]);
  }

}
