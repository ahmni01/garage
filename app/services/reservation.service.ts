import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

import {Observable} from 'rxjs/Observable'; 
import {AuthTokenService} from './auth.token.service';

@Injectable()
export class ReservationService{
    //private _reservationUrl = 'http://ahmni01-i168061:8080/rest/default/garage/v1/category';
    private _reservationUrl = sessionStorage.getItem('api_base_url') + 'reservation';
    private _token:any;
        
    constructor(private _http: Http, private _authTokenService:AuthTokenService){
      }
      
      
      addReservation(payload:string):Observable <any>{
        console.log("payload from Reservation before post invoke: "+ payload);
        var apiHeaders = new Headers();
        let _token=sessionStorage.getItem('id_token');        
        apiHeaders.append('Authorization', _token);//apiHeaders.append('Authorization', 'CALiveAPICreator f90a2b7e784e8abd7ba8687c149fb53e:1');
        apiHeaders.append('Content-Type', 'application/json');
        return this._http.post(this._reservationUrl,payload,{headers: apiHeaders})
                  .map((response: Response) => response.json())                 
                  .do(data =>{
                         console.log("Response from POST (Reservation): " + JSON.stringify(data))  
                       })       
      }
      
       getAllReservationInfo():Observable <any>{          
        var apiHeaders = new Headers();
        let _token=sessionStorage.getItem('id_token');        
        
        apiHeaders.append('Authorization', _token);//apiHeaders.append('Authorization', 'CALiveAPICreator f90a2b7e784e8abd7ba8687c149fb53e:1');
        apiHeaders.append('Content-Type', 'application/json');
        return this._http.get(this._reservationUrl,{headers: apiHeaders})
                  .map((response: Response) => response.json())                 
                  .do(data =>{
                         console.log("RecievedData: " + JSON.stringify(data))  
                       })
                  .catch(this.exceptionHandler);                        
        }
        
        private exceptionHandler(error: Response){
          console.log(error);
          return Observable.throw(error.json().error || 'Encountered Error!!')
        }        
      

}