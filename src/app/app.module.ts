import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment.prod';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EmailLoginComponent } from './login-method/email-login/email-login.component';
import { EmailSignupComponent } from './login-method/email-signup/email-signup.component';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { PhoneLoginComponent } from './login-method/phone-login/phone-login.component';
import { PhoneSignupComponent } from './login-method/phone-signup/phone-signup.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    EmailLoginComponent,
    EmailSignupComponent,
    PhoneLoginComponent,
    PhoneSignupComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features

    NgxUiLoaderModule,
  ],
  providers: [
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
