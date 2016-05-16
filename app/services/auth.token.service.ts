import {Injectable} from '@angular/core';
import {Http, Response,RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable'; 

@Injectable()
export class AuthTokenService{
    private _tokenUrl = 'http://ahmni01-i168061:8080/rest/default/garage/v1/@authentication';
    private _token:any;
    private _tokenExpirationDateTime:any;
    private _tokenStatus: boolean;
        
    constructor(private _http: Http){
      }
            
       getToken():Observable <any>{        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //console.log('Content-Type : ' + headers.get('Content-Type'));
        let options = new RequestOptions({ headers: headers });
 
        let body = JSON.stringify({ "username": "demo", "password": "Password1"});        
        return this._http.post(this._tokenUrl,body, options)
                   .map(this.extractData)                       
                   .catch(this.exceptionHandler);                        
        }
            
        private extractData(res: Response) {
          if (res.status < 200 || res.status >= 300) 
           throw new Error('Bad response status: ' + res.status);
        
           let body = res.json();
           //console.log("Token: " + JSON.stringify(body)); 
           this._token = 'CALiveAPICreator ' + body.apikey +':1';    
           this._tokenExpirationDateTime = body.expiration;           
           //console.log("Token Expires@" + this._tokenExpirationDateTime);
           
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