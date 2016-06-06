import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable'; 

import {Inventory}    from '../inventory/inventory';

@Injectable()
export class InventoryService{
    //private _inventoryUrl = 'http://ahmni01-i168061:8080/rest/default/garage/v1/inventory';
    private _inventoryUrl = sessionStorage.getItem('api_base_url')+'inventory';
    constructor(private _http: Http){
      }
      
      addNewInventory(payload:string):Observable <any>{
        var apiHeaders = new Headers();
        let _token=sessionStorage.getItem('id_token');        
        apiHeaders.append('Authorization', _token);//apiHeaders.append('Authorization', 'CALiveAPICreator f90a2b7e784e8abd7ba8687c149fb53e:1');
        apiHeaders.append('Content-Type', 'application/json');
        return this._http.post(this._inventoryUrl,payload,{headers: apiHeaders})
                  .map((response: Response) => <Inventory[]>response.json())                 
                  .do(data =>{
                         //console.log("Response from POST: " + JSON.stringify(data))  
                       })       
      }

      updateExistingInventory(payload:string):Observable <any>{
        var apiHeaders = new Headers();
        let _token=sessionStorage.getItem('id_token');        
        apiHeaders.append('Authorization', _token);//apiHeaders.append('Authorization', 'CALiveAPICreator f90a2b7e784e8abd7ba8687c149fb53e:1');
        apiHeaders.append('Content-Type', 'application/json');
        return this._http.put(this._inventoryUrl,payload,{headers: apiHeaders})
                  .map((response: Response) => <Inventory[]>response.json())                 
                  .do(data =>{
                         console.log("Response from PUT: " + JSON.stringify(data))  
                       })       
      }


       
       getInventory():Observable <any>{          
        var apiHeaders = new Headers();
        let _token=sessionStorage.getItem('id_token');        
        
        apiHeaders.append('Authorization', _token);//apiHeaders.append('Authorization', 'CALiveAPICreator f90a2b7e784e8abd7ba8687c149fb53e:1');
        apiHeaders.append('Content-Type', 'application/json');
        return this._http.get(this._inventoryUrl,{headers: apiHeaders})
                  .map((response: Response) => <Inventory[]>response.json())                 
                  .do(data =>{
                         //console.log("RecievedData: " + JSON.stringify(data))  
                       })
                  .catch(this.exceptionHandler);                        
        }
     
        findInventory(term: string){    
        var apiHeaders = new Headers();
        var urlwithFilter, searchFilterStr:string;
        let _token=sessionStorage.getItem('id_token');   
        
        apiHeaders.append('Authorization', _token);//apiHeaders.append('Authorization', 'CALiveAPICreator 68368c95857b7710514f52621ccc5eb7:1');
        apiHeaders.append('Content-Type', 'application/json');
        searchFilterStr =  '?filter=name like \'' + term + '%\'';
        urlwithFilter = this._inventoryUrl + searchFilterStr;
        return this._http.get(urlwithFilter,{headers: apiHeaders})
                   .map((response: Response) => <Inventory[]>response.json());                        
        }
         
        findInventoryByID(id: number):Observable<Inventory>{    
        var apiHeaders = new Headers();
        var urlwithFilter, searchFilterStr:string;
        let _token=sessionStorage.getItem('id_token');   
        console.log('####findInventoryByID: ' + id);
        apiHeaders.append('Authorization', _token);//apiHeaders.append('Authorization', 'CALiveAPICreator 68368c95857b7710514f52621ccc5eb7:1');
        apiHeaders.append('Content-Type', 'application/json');
        searchFilterStr =  '/' + id;
        urlwithFilter = this._inventoryUrl + searchFilterStr;
        console.log('####urlwithFilter: ' + urlwithFilter);
        return this._http.get(urlwithFilter,{headers: apiHeaders})
                   .map((response: Response) => <Inventory>response.json())
                   .do(data =>{
                         console.log("RecievedData: " + JSON.stringify(data))  
                       })                     
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