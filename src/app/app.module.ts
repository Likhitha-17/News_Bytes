import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReadnowComponent } from './readnow/readnow.component';
import { ArticlesComponent } from './readnow/articles/articles.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    ReadnowComponent,
    ArticlesComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AdminModule,
    UserModule,
    AppRoutingModule,HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
