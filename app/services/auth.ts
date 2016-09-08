import { Injectable } from '@angular/core';
import { ApiService } from './api';
import {Observable} from 'rxjs/Observable';
import {CanActivate, Router} from '@angular/router';
import 'rxjs/Rx';

@Injectable()
export class AuthService implements CanActivate {
  JWT_KEY: string = 'id_token';
  JWT_EXPIRY: string = 'id_token_expiration';

  constructor(
     private api: ApiService,
     private router: Router){
    const token = sessionStorage.getItem(this.JWT_KEY);
    if (token) {
      this.setJwt(token);
    }
  }

  setJwt(jwt: string) {
    sessionStorage.setItem(this.JWT_KEY, jwt);
    this.api.setHeaders({Authorization: `Bearer ${jwt}`});
  }

  setTokenExpiry(tokenExpiry:string){
    sessionStorage.setItem(this.JWT_EXPIRY, tokenExpiry);
  }

  isAuthorized(): boolean {
    let tokenExpiry = sessionStorage.getItem(this.JWT_EXPIRY);
    let tokenExpiryInMilliSeconds= new Date(tokenExpiry).getTime() - new Date().getTime();
    let tokenExpiryInMinutes =  (tokenExpiryInMilliSeconds/(1000*60)).toFixed().toString();
    console.log('tokenExpiryInMinutes (Left for debugging) - ' + tokenExpiryInMinutes);

    if(Number(tokenExpiryInMinutes) < 15) {
      console.log("Token Expired, Enforcing login...");
      return false;
    }
    else
      return Boolean(sessionStorage.getItem(this.JWT_KEY));
  }

  canActivate(): boolean {
    const isAuth = this.isAuthorized();
    if (!isAuth) {
      this.router.navigate(['', 'auth']);
    }
    return isAuth
  }

  authenticate(path, creds): Observable<any> {
    return this.api.post(`/${path}`, creds)
      .do(res => this.setJwt('CALiveAPICreator ' + res.apikey + ':1'))
      .do(res=>this.setTokenExpiry(res.expiration))
      .map(res => res.data);
  }

  signout() {
    sessionStorage.removeItem(this.JWT_KEY);
    sessionStorage.removeItem(this.JWT_EXPIRY);
    this.router.navigate(['', 'auth']);
  }
}