import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Token } from './token';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public  token: Token
    constructor(private http: Http, private router: Router,) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        //this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
        let url = 'http://localhost:63938/api/Authenticate';
      //  let url = '/Home/Authenticate?username' + username+'&password'+password;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({ username: username, password: password });
        return this.http.post(url, body, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                // let token = response.json() && response.json().token;
                if (response.json() == true) {
                    var _token = this.createToken(username);
                    if (_token) {
                        // set token property
                        this.token = _token;

                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ username: username, token: _token }));

                        // return true to indicate successful login
                        return true;
                    } else {
                        // return false to indicate failed login
                        return false;
                    }
                }
        
 
            });
    }
    createToken(username: string): Token {
        this.token = new Token();
        var today = new Date();
        this.token.Username = username;
        this.token.TokenType = "bearer";
        this.token.IssuedAt = today;
        this.token.ExpiresIn = 20;
        this.token.ExpiresAt = new Date(today.setMinutes(today.getMinutes() + this.token.ExpiresIn));
        this.token.AccessToken = Guid.newGuid();
        return this.token;
    }
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
    isAuthorized(): boolean {
        if (this.token && !this.isTokenExpired()) {
            return true;
        } else {
            return false;
        }
    }
    isTokenExpired(): boolean {
        let duration = this._getMinutesBetweenDates(this.token.ExpiresAt);
        if (duration >= 0 && duration <= this.token.ExpiresIn) {
            var today = new Date();
            this.token.ExpiresAt = new Date(today.setMinutes(today.getMinutes() + this.token.ExpiresIn));
            return false;
        }
        else {
            this.token = null;
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login']);
            return true;
        }
        
    }
    _getMinutesBetweenDates(expiryDate: Date): number {
        var diff = new Date(expiryDate).getTime() - new Date().getTime();
    return (diff / 60000);
}
}

class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}