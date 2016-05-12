
import {Injectable} from 'angular2/core';
import {Headers} from 'angular2/http';
import {Http, RequestOptions, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable'; 

@Injectable()
export class AuthTokenService{
    private _tokenUrl = 'http://ahmni01-i168061:8080/rest/default/garage/v1/@authentication';
    private _token:any;
    private _tokenExpiration:any;
        
    constructor(private _http: Http){
      }
      
       getToken():Observable <any>{        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        console.log('Content-Type : ' + headers.get('Content-Type'));
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
           console.log("Token: " + JSON.stringify(body)); 
           this._token = 'CALiveAPICreator ' + body.apikey +':1';    
           this._tokenExpiration = body.expiration;           
           console.log("Token Expires@" + this._tokenExpiration);
           
           //var time = new Date().getTime() - new Date(this._tokenExpiration).getTime();
           var time = new Date("2016-05-10T04:30:30.000Z").getTime() - new Date(this._tokenExpiration).getTime();
           
           //let day = new Date("2015-03-25T12:00:00");
           //console.log("Date ----------" + day.toDateString());
           //console.log("Difference in minutes - " + day.getMinutes());           
           console.log("###########Time Difference############## " + time);
           
           localStorage.setItem('id_token', this._token);                            
           return body.data || { };
        }
        
        private exceptionHandler(error: Response){
          console.log(error);
          return Observable.throw(error.json().error || 'Encountered Error!!')
        }
}