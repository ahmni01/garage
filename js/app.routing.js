"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var report_component_1 = require('./report/report.component');
var inventory_component_1 = require('./inventory/inventory.component');
var inventory_details_component_1 = require('./inventory/inventory-details.component');
var adminbay_component_1 = require('./adminbay/adminbay.component');
var auth_1 = require('./containers/auth');
var auth_2 = require('./services/auth');
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent, canActivate: [auth_2.AuthService] },
    { path: 'inventory', component: inventory_component_1.InventoryComponent, canActivate: [auth_2.AuthService] },
    { path: 'item/:id', component: inventory_details_component_1.InventoryDetailsComponent, canActivate: [auth_2.AuthService] },
    { path: 'reports', component: report_component_1.ReportComponent, canActivate: [auth_2.AuthService] },
    { path: 'adminbay', component: adminbay_component_1.AdminBayComponent, canActivate: [auth_2.AuthService] },
    { path: 'auth', component: auth_1.Auth },
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map