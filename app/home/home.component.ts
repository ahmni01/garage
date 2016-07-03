import {Component, OnInit}  from '@angular/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes} from '@angular/router';

import {AuthTokenService} from '../services/auth.token.service';

@Component({
    templateUrl: 'app/home/home.component.html',
    directives: [ROUTER_DIRECTIVES],
  providers:[ROUTER_PROVIDERS, AuthTokenService]

})
export class HomeComponent  implements OnInit{
    pageTitle:string = 'Welcome to CA Garage!';
     private token:any;
    constructor(private _authTokenService:AuthTokenService){

    }
    ngOnInit():void{
                   this._authTokenService.getToken()
  .subscribe(token => {
    this.token = token;    

    });
}
} 