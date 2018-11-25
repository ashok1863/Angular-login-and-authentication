import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from './Login/authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
    
  title = 'app';
  
  constructor(
    private _authService: AuthenticationService
) { 
    
}

public isLoggedIn() {
    return this._authService.isAuthorized();
}
logout(): void {
    this._authService.logout();
}
}
