import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneSignupComponent } from './phone-signup.component';

describe('PhoneSignupComponent', () => {
  let component: PhoneSignupComponent;
  let fixture: ComponentFixture<PhoneSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
