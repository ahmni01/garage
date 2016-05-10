import {Component}         from 'angular2/core';
import {InventoryComponent} from './inventory/inventory.component';
import {InventoryDetailsComponent} from './inventory/inventory-details.component';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {ItemComponent} from './items.component';
import {HomeComponent} from './home/home.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

@Component({
  selector: 'garage-app',
  template: ` 
  <div>
  <nav class="navbar navbar-default navbar-fixed-top">
 
  <a class="navbar-brand">CA Garage</a>
     <ul class="nav navbar-nav">        
        <li><a [routerLink]="['Home']">Home</a></li>
        <li><a [routerLink]="['Inventory']">Manage Inventory</a></li>
       <li><a [routerLink]="['TestComponent']">Admin Bay</a></li>
       <li><a [routerLink]="['TestComponent']">Reports</a></li>
     </ul>
     <div class="container-fluid">
  
    </div>
    
    </nav>
  <div class='container'>
    <router-outlet></router-outlet>
    </div>
  </div> `,
  directives: [InventoryComponent, ROUTER_DIRECTIVES,ItemComponent],
  providers:[ROUTER_PROVIDERS, HTTP_PROVIDERS]  
})

@RouteConfig([
  {path:'/home', name:'Home', component: HomeComponent, useAsDefault: true },
  {path:'/inventory', name:'Inventory',component: InventoryComponent},
  {path:'/item/:id', name:'ItemInformation',component: InventoryDetailsComponent},
  {path:'/adminbay', name:'TestComponent',component: ItemComponent}
  
])
export class MainComponent {
  pageTitle:string = 'CA GARAGE!';
 }




