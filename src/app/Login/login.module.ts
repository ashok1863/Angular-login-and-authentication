/// <reference path="../app.module.ts" />
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
//import { fakeBackendProvider } from './fake-backend';
//import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

//import { AppComponent } from './app.component';
import { routing } from '../app.routing';

import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user_auth.service';
import { LoginComponent } from './login.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        
        LoginComponent
        
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,

        // providers used to create fake backend
       // fakeBackendProvider,
        //MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [LoginComponent]
})

export class LoginModule { }