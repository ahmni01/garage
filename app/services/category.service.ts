
import {Injectable} from 'angular2/core';
import {Headers} from 'angular2/http';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable'; 
import {AuthTokenService} from './auth.token.service';

@Injectable()
export class CategoryService{
    private _categoryUrl = 'http://ahmni01-i168061:8080/rest/default/garage/v1/category';
    private _token:any;
        
    constructor(private _http: Http, private _authTokenService:AuthTokenService){
      }
      
       getCategories():Observable <any>{          
        var apiHeaders = new Headers();
        console.log("<= Session Token => " + localStorage.getItem('id_token'));
        let _token=localStorage.getItem('id_token');        
        
        apiHeaders.append('Authorization', _token);
         
       
      //  apiHeaders.append('Content-Type', 'application/json');
      //  console.log('Content-Type : ' + apiHeaders.get('Content-Type'));
 
            return this._http.get(this._categoryUrl,{
                headers: apiHeaders
            })
                       .map((response: Response) => <any>response.json())
                       .do(data => {
                       // console.log("RecievedData: " + JSON.stringify(data))   
                       }                       
                       )
                       .catch(this.exceptionHandler);                        
        }
        private exceptionHandler(error: Response){
          console.log(error);
          return Observable.throw(error.json().error || 'Encountered Error!!')
        }
}