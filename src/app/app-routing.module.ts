import { PaypalOrdersComponent } from './my-orders/paypal-orders/paypal-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { PaypalComponent } from './payment-methods/paypal/paypal.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailLoginComponent } from './login-method/email-login/email-login.component';
import { EmailSignupComponent } from './login-method/email-signup/email-signup.component';
import { PhoneLoginComponent } from './login-method/phone-login/phone-login.component';
import { PhoneSignupComponent } from './login-method/phone-signup/phone-signup.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PaypalOrderViewComponent } from './my-orders/paypal-order-view/paypal-order-view.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { page: 'home' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { page: 'login' }
  },
  {
    path: 'email-login',
    component: EmailLoginComponent
  },
  {
    path: 'email-signup',
    component: EmailSignupComponent
  },
  {
    path: 'phone-login',
    component: PhoneLoginComponent
  },
  {
    path: 'phone-signup',
    component: PhoneSignupComponent
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'payment-methods',
    component: PaymentMethodsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'paypal',
    component: PaypalComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'paypal-orders',
    component: PaypalOrdersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'paypal-order-view/:orderID',
    component: PaypalOrderViewComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
