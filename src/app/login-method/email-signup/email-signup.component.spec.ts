import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSignupComponent } from './email-signup.component';

describe('EmailSignupComponent', () => {
  let component: EmailSignupComponent;
  let fixture: ComponentFixture<EmailSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
