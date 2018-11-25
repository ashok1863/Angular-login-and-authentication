import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import {FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { routing } from './app.routing';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { UserComponent } from './User/Components/user.component';
//import { UserService } from './User/Service/user.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './Home/home.component';
import { LoginModule } from './Login/login.module';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule ,
    LoginModule
    
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
