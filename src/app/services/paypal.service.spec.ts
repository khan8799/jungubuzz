import { TestBed } from '@angular/core/testing';

import { PaypalService } from './paypal.service';

describe('PaypalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaypalService = TestBed.get(PaypalService);
    expect(service).toBeTruthy();
  });
});
