import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailLoginComponent } from './login-method/email-login/email-login.component';
import { EmailSignupComponent } from './login-method/email-signup/email-signup.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
