import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ReportComponent} from './report/report.component';
import {InventoryComponent} from './inventory/inventory.component';
import {InventoryDetailsComponent} from './inventory/inventory-details.component';
import { AdminBayComponent } from './adminbay/adminbay.component';
import { Auth } from './containers/auth'
import { AuthService } from './services/auth'
import { ModuleWithProviders } from '@angular/core';

const appRoutes: Routes = [
      { path: '', component: HomeComponent, canActivate: [AuthService]},
      { path: 'inventory', component: InventoryComponent, canActivate: [AuthService]},
      { path: 'item/:id', component: InventoryDetailsComponent, canActivate: [AuthService]},
      { path: 'reports', component: ReportComponent, canActivate: [AuthService]},
      { path: 'adminbay', component: AdminBayComponent , canActivate: [AuthService]},
      { path: 'auth', component: Auth},
      { path: '**', redirectTo: '' }
      ];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
