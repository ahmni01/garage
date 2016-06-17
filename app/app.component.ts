import {Component, OnInit}  from '@angular/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

import {InventoryComponent} from './inventory/inventory.component';
import {InventoryDetailsComponent} from './inventory/inventory-details.component';
import {HomeComponent} from './home/home.component';
import {AdminBayComponent} from './adminbay/adminbay.component';
import {ReportComponent} from './report/report.component';
import {ConfigService} from './services/config.service';  
import {AuthTokenService} from './services/auth.token.service';

@Component({
  selector: 'garage-app',
  template: ` 
  <div>
  <nav class="navbar navbar-default navbar-fixed-top">
  <a class="navbar-brand">CA Garage</a>
     <ul class="nav navbar-nav">        
        <li><a [routerLink]="['/home']">Home</a></li>
        <li><a [routerLink]="['/inventory']">Manage Inventory</a></li>
       <li><a [routerLink]="['/adminbay']">Admin Bay</a></li>
       <li><a [routerLink]="['/reports']">Reports</a></li>
     </ul>    
    </nav>
  <div class='container'>
    <router-outlet></router-outlet>
    </div>
  </div> `,
  directives: [ROUTER_DIRECTIVES],
  providers:[InventoryComponent,             
             ROUTER_PROVIDERS, 
             HTTP_PROVIDERS,
             ConfigService, 
             AuthTokenService]  
})

@Routes([
  {path:'/',  component: HomeComponent},
  {path:'/home', component: HomeComponent},
  {path:'/inventory', component: InventoryComponent},
  {path:'/item/:id',  component: InventoryDetailsComponent},
  {path:'/reports',  component: ReportComponent},
  {path:'/adminbay',  component: AdminBayComponent}
  
])
export class MainComponent  implements OnInit{
      constructor(private _configService: ConfigService,
                  private _authTokenService:AuthTokenService){
      }   
  pageTitle:string = 'CA GARAGE!';
  private _dataFromConfig:any;
  private token:any;

  ngOnInit():void{
  this._configService.loadConfig()
          .subscribe(_dataFromConfig => this._dataFromConfig = _dataFromConfig);
           this._authTokenService.getToken()
  .subscribe(token => {
    this.token = token;    
  }); 
} 
  
 }




