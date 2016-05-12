
import {Injectable} from 'angular2/core';
import {Headers} from 'angular2/http';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable'; 

@Injectable()
export class InventoryService{
    private _inventoryUrl = 'http://ahmni01-i168061:8080/rest/default/garage/v1/inventory';
        
    constructor(private _http: Http){
      }
      
       getInventory():Observable <any>{          
        var apiHeaders = new Headers();
        apiHeaders.append('Authorization', 'CALiveAPICreator f90a2b7e784e8abd7ba8687c149fb53e:1');
      //  console.log('Authorization : ' + apiHeaders.get('Authorization'));    
       
      //  apiHeaders.append('Content-Type', 'application/json');
      //  console.log('Content-Type : ' + apiHeaders.get('Content-Type'));
 
            return this._http.get(this._inventoryUrl,{
                headers: apiHeaders
            })
                       .map((response: Response) => <any>response.json())
                       .do(data =>{
                        // console.log("RecievedData: " + JSON.stringify(data))  
                       })
                       .catch(this.exceptionHandler);                        
        }
        private exceptionHandler(error: Response){
          console.log(error);
          return Observable.throw(error.json().error || 'Encountered Error!!')
        }
}