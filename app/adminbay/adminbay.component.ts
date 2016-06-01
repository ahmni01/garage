import {Component}  from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {Inventory}    from '../inventory/inventory';
import {InventoryService} from '../services/inventory.service';
import {Observable} from 'rxjs/Observable'; 
import {Subject}  from 'rxjs/Subject';

@Component({
    templateUrl: 'app/adminbay/adminbay.component.html',
    directives: [ROUTER_DIRECTIVES],
  providers:[InventoryService]

}) 
export class AdminBayComponent{
 constructor(private _inventoryService:InventoryService ){        
    }
   private pageTitle:string = 'Search & Allocate';
   private searchTermStream = new Subject<string>();

 search(term: string) { 
    if (!term) { return; };
    this.searchTermStream.next(term); 
  }

 inventoryData: Observable<Inventory[]> = this.searchTermStream
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap((term: string) => this._inventoryService.findInventory(term)); 
} 