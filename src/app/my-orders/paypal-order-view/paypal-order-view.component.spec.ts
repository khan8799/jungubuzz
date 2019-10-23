import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalOrderViewComponent } from './paypal-order-view.component';

describe('PaypalOrderViewComponent', () => {
  let component: PaypalOrderViewComponent;
  let fixture: ComponentFixture<PaypalOrderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalOrderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
