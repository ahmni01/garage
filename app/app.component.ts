import { Component, OnInit } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import {ConfigService} from './services/config.service'; 
import { AuthService } from './services/auth';
import { ApiService } from './services/api';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'garage-app',
  template: ` 

    <div class='container-fluid'>
      <router-outlet></router-outlet>
    </div> `,
  providers:[RouterModule,
             HTTP_PROVIDERS,
             ConfigService
             ]
            ,directives: [ROUTER_DIRECTIVES]
})
export class AppComponent implements OnInit{
      constructor(private _configService: ConfigService
                  //,private _authService: AuthService
                  ){
      }  
      private _dataFromConfig:any; 
      private loggedin:boolean;
    
      ngOnInit():void{
        this._configService.loadConfig()
            .subscribe(_dataFromConfig => this._dataFromConfig = _dataFromConfig); 
         /*   if(this._authService.isAuthorized()){
              this.loggedin=true;
            }*/

        
      } 
      showLogout(){
        this.loggedin=true;
      }

      logOff(){
        this.loggedin=false;
        //this._authService.signout();
      }
}