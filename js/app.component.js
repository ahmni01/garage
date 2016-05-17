System.register(['@angular/core', '@angular/router', '@angular/http', 'rxjs/Rx', './inventory/inventory.component', './inventory/inventory-details.component', './home/home.component', './adminbay/adminbay.component', './report/report.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, http_1, inventory_component_1, inventory_details_component_1, home_component_1, adminbay_component_1, report_component_1;
    var MainComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
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
            MainComponent = (function () {
                function MainComponent() {
                    this.pageTitle = 'CA GARAGE!';
                }
                MainComponent = __decorate([
                    core_1.Component({
                        selector: 'garage-app',
                        template: " \n  <div>\n  <nav class=\"navbar navbar-default navbar-fixed-top\">\n  <a class=\"navbar-brand\">CA Garage</a>\n     <ul class=\"nav navbar-nav\">        \n        <li><a [routerLink]=\"['/home']\">Home</a></li>\n        <li><a [routerLink]=\"['/inventory']\">Manage Inventory</a></li>\n       <li><a [routerLink]=\"['/adminbay']\">Admin Bay</a></li>\n       <li><a [routerLink]=\"['/reports']\">Reports</a></li>\n     </ul>    \n    </nav>\n  <div class='container'>\n    <router-outlet></router-outlet>\n    </div>\n  </div> ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [inventory_component_1.InventoryComponent,
                            router_1.ROUTER_PROVIDERS,
                            http_1.HTTP_PROVIDERS]
                    }),
                    router_1.Routes([
                        { path: '/', component: home_component_1.HomeComponent },
                        { path: '/home', component: home_component_1.HomeComponent },
                        { path: '/inventory', component: inventory_component_1.InventoryComponent },
                        { path: '/item/:id', component: inventory_details_component_1.InventoryDetailsComponent },
                        { path: '/reports', component: report_component_1.ReportComponent },
                        { path: '/adminbay', component: adminbay_component_1.AdminBayComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], MainComponent);
                return MainComponent;
            }());
            exports_1("MainComponent", MainComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map