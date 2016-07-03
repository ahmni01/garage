import {Component, Injectable, OnInit} from '@angular/core';
import {Http, Response,RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/retry';

import {ConfigService} from './config.service';  

@Component({  
  providers:[ConfigService]
})
@Injectable()
export class AuthTokenService implements OnInit{
    //private _tokenUrl = 'http://ahmni01-i168061:8080/rest/default/garage/v1/@authentication';
    private _tokenUrl = sessionStorage.getItem('api_base_url') + '@authentication';
    private _token:any;
    private _tokenExpirationDateTime:any;
    private _tokenStatus: boolean; 
    private _dataFromConfig:any;
        
    constructor(private _http: Http, private _configService: ConfigService){
      }      

ngOnInit():void{
  this.getConfig();
}      
      getConfig():void{
          this._configService.loadConfig()
          .subscribe(_dataFromConfig => this._dataFromConfig = _dataFromConfig);      
      }
       
       getToken():Observable <any>{
        this.getConfig();        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({ "username": "demo", "password": "Password1"});        
        return this._http.post(this._tokenUrl,body, options)
                   .retry(3)
                   .map(this.extractData)                       
                   .catch(this.exceptionHandler);                        
        }
            
        private extractData(res: Response) {
          if (res.status < 200 || res.status >= 300) 
           throw new Error('Bad response status: ' + res.status);
        
           let body = res.json();
           this._token = 'CALiveAPICreator ' + body.apikey +':1';    
           this._tokenExpirationDateTime = body.expiration;           
           let tokenExpiresIn = new Date(this._tokenExpirationDateTime).getTime() - new Date().getTime();
           //console.log("Token Expires in : " + tokenExpiresIn + ' milleseconds, ' + tokenExpiresIn/(1000*60) + ' minutes');
           sessionStorage.setItem('id_token', this._token);                            
           return body.data || { };
        }
        
        private exceptionHandler(error: Response){
          console.log(error);
          return Observable.throw(error.json().error || 'Encountered Error!!')
        }
}