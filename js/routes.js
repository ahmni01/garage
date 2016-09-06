System.register(['@angular/router', './inventory/inventory.component', './inventory/inventory-details.component', './home/home.component', './adminbay/adminbay.component', './report/report.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, inventory_component_1, inventory_details_component_1, home_component_1, adminbay_component_1, report_component_1;
    var appRoutes, APP_ROUTER_PROVIDER;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (inventory_component_1_1) {
                inventory_component_1 = inventory_component_1_1;
            },
            function (inventory_details_component_1_1) {
                inventory_details_component_1 = inventory_details_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (adminbay_component_1_1) {
                adminbay_component_1 = adminbay_component_1_1;
            },
            function (report_component_1_1) {
                report_component_1 = report_component_1_1;
            }],
        execute: function() {
            exports_1("appRoutes", appRoutes = [
                { path: '', component: home_component_1.HomeComponent, terminal: true },
                { path: '/home', component: home_component_1.HomeComponent },
                { path: '/inventory', component: inventory_component_1.InventoryComponent },
                { path: '/item/:id', component: inventory_details_component_1.InventoryDetailsComponent },
                { path: '/reports', component: report_component_1.ReportComponent },
                { path: '/adminbay', component: adminbay_component_1.AdminBayComponent }
            ]);
            exports_1("APP_ROUTER_PROVIDER", APP_ROUTER_PROVIDER = router_1.provideRouter(appRoutes));
        }
    }
});
//# sourceMappingURL=routes.js.map