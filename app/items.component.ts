import {Component} from 'angular2/core';
import {Inventory}    from './inventory/inventory';
import {InventoryFilterPipe} from './inventory/inventory-filter.pipe';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({  
  selector:'itemlist-component',
  templateUrl: 'app/items.html',
  pipes: [InventoryFilterPipe],
  directives: [ROUTER_DIRECTIVES]  
})

export class ItemComponent {
  
  listFilter: string = '';  
  //category = ['Lego', 'Drone','Book', 'AI-KIT'];

  model = new Inventory(1, '', 'BostonDynamics', 'Books','ssss' );  
  
 items:Inventory[] = [
 {id:1,name:'Lego',vendor_contact:'Prabhjoth',cost:0, vendor_name:'LEGO.COM',category:'Lego',purchase_date:'false'},
 {id:2,name:'Mini-Drone',vendor_contact:'Prabhjoth',cost:100, vendor_name:'Syma',category:'Drone',purchase_date:'false'},
 {id:3,name:'Raspberry PI v1',vendor_contact:'Shawali',cost:10, vendor_name:'RASPBERRY PI FOUNDATION',category:'Rasperry',purchase_date:'false'},
 {id:4,name:'Raspberry PI v2',vendor_contact:'Shawali',cost:15, vendor_name:'RASPBERRY PI FOUNDATION',category:'Rasperry',purchase_date:'false'},
 {id:5,name:'Raspberry PI v3',vendor_contact:'Shawali',cost:20, vendor_name:'RASPBERRY PI FOUNDATION',category:'Rasperry',purchase_date:'false'}, 
 {id:6,name:'AI-Kit 1.0',vendor_contact:'Shawali',cost:50,vendor_name:'AI-Kit Vendor',category:'AI-Kit', purchase_date:'false'}               
 ]; 
}