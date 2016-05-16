import {Component}  from '@angular/core';
import {Router, OnActivate, RouteSegment} from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {InventoryService} from '../services/inventory.service';
import {Inventory}    from './inventory';
import {InventoryComponent} from '../inventory/inventory.component';


@Component({
    templateUrl: 'app/inventory/inventory-details.component.html',
    providers: [InventoryService],
       directives: [ROUTER_DIRECTIVES]
 
    
})
export class InventoryDetailsComponent implements OnActivate{
    pageTitle:string = 'Inventory details';
    item: Inventory; 
    errorMessage: string;
    
    constructor(private _inventoryService: InventoryService, 
                private _router: Router){
    }
    
    routerOnActivate(curr: RouteSegment): void {
        let id = +curr.getParam('id');
        this.pageTitle = this.pageTitle + ':' + id;
        this.searchInventory(id);
    }

    searchInventory(id: number) {
        this._inventoryService.searchInventory(id)
            .subscribe(
            item => {
                this.item = item},
            error => this.errorMessage = <any>error);
           // console.log("###item.name####" +this.item.name)
           
            }
    
        onBack(): void {
        this._router.navigate(['/adminbay']);
    }
} 