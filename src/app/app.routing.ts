import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationService } from './Login/authentication.service'
import { UserComponent } from './User/Components/user.component';

import { HomeComponent } from './Home/home.component';

import { LoginComponent } from './Login/login.component';

import { AuthGuard } from './Login/auth.guard';



const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, //start
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
];

export const routing: ModuleWithProviders =
    RouterModule.forRoot(appRoutes);