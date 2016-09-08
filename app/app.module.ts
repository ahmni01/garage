import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { routing }        from './app.routing';
import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryDetailsComponent } from './inventory/inventory-details.component';
import { AdminBayComponent } from './adminbay/adminbay.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth';
import { Auth } from './containers/auth';
import { ApiService } from './services/api';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {ConfigService} from './services/config.service'; 
import {InventoryService} from './services/inventory.service';
import {CategoryService} from './services/category.service';

@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  ReactiveFormsModule,
                  routing
                  ],
                  
  declarations: [ AppComponent,
                  HomeComponent,
                  ReportComponent,
                  InventoryComponent,
                  AdminBayComponent,
                  InventoryDetailsComponent,
                  Auth],
  
  providers: [ConfigService,
              AuthService,
              ApiService, 
              Http, 
              HTTP_PROVIDERS,
              Auth,
              InventoryService,
              CategoryService],
  
  bootstrap: [ AppComponent ]
})
export class AppModule { }
