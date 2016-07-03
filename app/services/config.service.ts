import {Injectable} from '@angular/core';
import {Http, Response,RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable'; 
import 'rxjs/add/operator/retry';

@Injectable()
export class ConfigService{
    private configUrl:string = 'app/resources/config.properties';
    private apiUrl:string;
    private apiVersion: string;
    private userName:string;
    private password:string;
        
    constructor(private _http: Http){
      }
      
      loadConfig():Observable <any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.configUrl, options)
                   .retry(3)
                   .map(this.extractData)                       
                   .catch(this.exceptionHandler);                           
      }           
            
        private extractData(res: Response) {
          if (res.status < 200 || res.status >= 300) 
           throw new Error('Bad response status: ' + res.status);
        
           let body = res.json();

           this.apiVersion = body.apiVersion;
           sessionStorage.setItem('api_version', this.apiVersion);
           //console.log("API Version : " + sessionStorage.getItem('api_version'));
           
           this.apiUrl = body.apiBaseUrl;           
           this.apiUrl = this.apiUrl +'/' + this.apiVersion +'/';           
           sessionStorage.setItem('api_base_url', this.apiUrl);
           //console.log("Base Url : " + sessionStorage.getItem('api_base_url'));           
           
           this.userName = body.userName;
           sessionStorage.setItem('username', this.userName);
           //console.log("username : " + sessionStorage.getItem('username'));
           
           this.password = body.password;
           sessionStorage.setItem('password', this.password);
           //console.log("password : " + sessionStorage.getItem('password'));
           
           //console.log("Token Expires@" + this._tokenExpirationDateTime);           
           //sessionStorage.setItem('id_token', this._token);                            
           return body.data || { };
        }
        
        private exceptionHandler(error: Response){
          console.log(error);
          return Observable.throw(error.json().error || 'Encountered Error!!')
        }
}