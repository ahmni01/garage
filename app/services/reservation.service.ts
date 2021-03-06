import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable'; 
import 'rxjs/add/operator/retry';

@Injectable()
export class ReservationService{
    //private _reservationUrl = 'http://ahmni01-i168061:8080/rest/default/garage/v1/category';
    private _reservationUrl = sessionStorage.getItem('api_base_url') + 'reservation';
    private _token:any;
        
    constructor(private _http: Http){
      }
            
      addReservation(payload:string):Observable <any>{
        var apiHeaders = new Headers();
        let _token=sessionStorage.getItem('id_token');        
        apiHeaders.append('Authorization', _token);//apiHeaders.append('Authorization', 'CALiveAPICreator f90a2b7e784e8abd7ba8687c149fb53e:1');
        apiHeaders.append('Content-Type', 'application/json');
        return this._http.post(this._reservationUrl,payload,{headers: apiHeaders})
                  .retry(3)
                  .map((response: Response) => response.json());                 
                  //.do(data =>{
                         //console.log("Response from POST (Reservation): " + JSON.stringify(data))  
                    //   })       
      }
      
       getAllReservationInfo():Observable <any>{          
        var apiHeaders = new Headers();
        let _token=sessionStorage.getItem('id_token');  
        let currentReservervations = this._reservationUrl + '?filter=returned_date+IS+NULL';      
        
        apiHeaders.append('Authorization', _token);//apiHeaders.append('Authorization', 'CALiveAPICreator f90a2b7e784e8abd7ba8687c149fb53e:1');
        apiHeaders.append('Content-Type', 'application/json');
        return this._http.get(currentReservervations,{headers: apiHeaders, body: ''})
                  .retry(3)
                  .map((response: Response) => response.json());                 
                  //.do(data =>{
                         //console.log("RecievedData: " + JSON.stringify(data))  
                       //})
                  //.catch(this.exceptionHandler);                        
        }


        updateReservation(payload:string):Observable <any>{
        var apiHeaders = new Headers();
        let _token=sessionStorage.getItem('id_token');        
        apiHeaders.append('Authorization', _token);//apiHeaders.append('Authorization', 'CALiveAPICreator f90a2b7e784e8abd7ba8687c149fb53e:1');
        apiHeaders.append('Content-Type', 'application/json');
        return this._http.put(this._reservationUrl,payload,{headers: apiHeaders})
                  .retry(3)
                  .map((response: Response) => response.json());                 
                  //.do(data =>{
                         //console.log("Response from PUT (Reservation Service): " + JSON.stringify(data))  
                       //})       
      }        
        
        private exceptionHandler(error: Response){
          console.log(error);
          return Observable.throw(error.json().error || 'Encountered Error!!')
        }        
      

}