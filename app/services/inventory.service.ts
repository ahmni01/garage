import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable'; 

import {Inventory}    from '../inventory/inventory';

@Injectable()
export class InventoryService{
    private _inventoryUrl = 'http://ahmni01-i168061:8080/rest/default/garage/v1/inventory';
        
    constructor(private _http: Http){
      }
      
       getInventory():Observable <any>{          
        var apiHeaders = new Headers();
        let _token=sessionStorage.getItem('id_token');        
        
        apiHeaders.append('Authorization', _token);//apiHeaders.append('Authorization', 'CALiveAPICreator f90a2b7e784e8abd7ba8687c149fb53e:1');
        apiHeaders.append('Content-Type', 'application/json');
        return this._http.get(this._inventoryUrl,{headers: apiHeaders})
                  .map((response: Response) => <Inventory[]>response.json())                 
                  .do(data =>{
                        // console.log("RecievedData: " + JSON.stringify(data))  
                       })
                  .catch(this.exceptionHandler);                        
        }
        
        searchInventory(id: number): Observable<Inventory> {
        return this.getInventory()
            .map((inventory: Inventory[]) => inventory.find(item => item.id === id));
    }

        
        private exceptionHandler(error: Response){
          console.log(error);
          return Observable.throw(error.json().error || 'Encountered Error!!')
        }
}