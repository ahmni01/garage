import {Component, OnInit}  from '@angular/core';
import { ROUTER_DIRECTIVES, Routes} from '@angular/router';
import { AuthService } from '../services/auth'
import { Auth } from '../containers/auth';


@Component({
    templateUrl: 'app/home/home.component.html',
    providers:[ AuthService, Auth]

})
export class HomeComponent  implements OnInit{
    constructor(private _authService:AuthService){
         if(this._authService.isAuthorized()){
              this.loggedin=true;
            }

    }
    pageTitle:string = 'Welcome to CA Garage!';
    private loggedin:boolean;

    ngOnInit():void{
                  
}

      logOff(){
        this.loggedin=false;
        this._authService.signout();
      }
} 