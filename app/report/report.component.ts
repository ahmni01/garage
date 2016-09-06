import {Component}  from '@angular/core';
import { ROUTER_DIRECTIVES, Routes} from '@angular/router';
import { AuthService } from '../services/auth'
import { Auth } from '../containers/auth';

@Component({
    templateUrl: 'app/report/report.component.html',
    providers: [AuthService, Auth]

})
export class ReportComponent{
    pageTitle:string = 'Reports';
    private loggedin:boolean;

       constructor(private _authService:AuthService){
         if(this._authService.isAuthorized()){
              this.loggedin=true;
            }

    }
    logOff(){
        this.loggedin=false;
        this._authService.signout();
      }
    
   
} 