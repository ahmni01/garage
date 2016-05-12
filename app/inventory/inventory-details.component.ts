import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import {InventoryFilterPipe} from './inventory-filter.pipe';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {InventoryComponent} from './inventory.component';
import { Inventory }    from './inventory';


@Component({
    templateUrl: 'app/inventory/inventory-details.component.html',
    pipes: [InventoryFilterPipe],
    directives: [ROUTER_DIRECTIVES],
  providers:[ROUTER_PROVIDERS, InventoryComponent]

})
export class InventoryDetailsComponent{
    pageTitle:string = 'Inventory details';
    
    constructor(private _routeParams: RouteParams){
        let id = + this._routeParams.get('id');
        this.pageTitle += `: ${id}`;
    }
} 