import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalOrdersComponent } from './paypal-orders.component';

describe('PaypalOrdersComponent', () => {
  let component: PaypalOrdersComponent;
  let fixture: ComponentFixture<PaypalOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
