import {Component, OnInit}  from '@angular/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes} from '@angular/router';

import {Inventory}    from '../inventory/inventory';
import {InventoryService} from '../services/inventory.service';
import {InventoryFilterPipe} from '../inventory/inventory-filter.pipe';
import {AuthTokenService} from '../services/auth.token.service';


@Component({
    templateUrl: 'app/adminbay/adminbay.component.html',
    directives: [ROUTER_DIRECTIVES],
    pipes: [InventoryFilterPipe],
  providers:[InventoryService, AuthTokenService]

})
export class AdminBayComponent implements OnInit{
    pageTitle:string = 'Search & Allocate';
    inventory: Inventory[]; 
    token:any;
    listFilter: string = ''; 
 
    constructor(private _authTokenService: AuthTokenService,
                private _inventoryService:InventoryService ){        
    }
    
    ngOnInit():void{
     this._authTokenService.getToken()
     .subscribe(token => {
        this.token = token;
        console.log("AdminBayComponent: token recieved??? : " + token);
        });
      
       this._inventoryService.getInventory()
      .subscribe(inventory => this.inventory = inventory);       
    } 
    
   
} 