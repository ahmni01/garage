System.register(['angular2/core', './inventory/inventory.component', './inventory/inventory-details.component', 'angular2/router', './items.component', './home/home.component', 'angular2/http', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, inventory_component_1, inventory_details_component_1, router_1, items_component_1, home_component_1, http_1;
    var MainComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (inventory_component_1_1) {
                inventory_component_1 = inventory_component_1_1;
            },
            function (inventory_details_component_1_1) {
                inventory_details_component_1 = inventory_details_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (items_component_1_1) {
                items_component_1 = items_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            MainComponent = (function () {
                function MainComponent() {
                    this.pageTitle = 'CA GARAGE!';
                }
                MainComponent = __decorate([
                    core_1.Component({
                        selector: 'garage-app',
                        template: " \n  <div>\n  <nav class=\"navbar navbar-default navbar-fixed-top\">\n \n  <a class=\"navbar-brand\">CA Garage</a>\n     <ul class=\"nav navbar-nav\">        \n        <li><a [routerLink]=\"['Home']\">Home</a></li>\n        <li><a [routerLink]=\"['Inventory']\">Manage Inventory</a></li>\n       <li><a [routerLink]=\"['TestComponent']\">Admin Bay</a></li>\n       <li><a [routerLink]=\"['TestComponent']\">Reports</a></li>\n     </ul>\n     <div class=\"container-fluid\">\n  \n    </div>\n    \n    </nav>\n  <div class='container'>\n    <router-outlet></router-outlet>\n    </div>\n  </div> ",
                        directives: [inventory_component_1.InventoryComponent, router_1.ROUTER_DIRECTIVES, items_component_1.ItemComponent],
                        providers: [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS]
                    }),
                    router_1.RouteConfig([
                        { path: '/home', name: 'Home', component: home_component_1.HomeComponent, useAsDefault: true },
                        { path: '/inventory', name: 'Inventory', component: inventory_component_1.InventoryComponent },
                        { path: '/item/:id', name: 'ItemInformation', component: inventory_details_component_1.InventoryDetailsComponent },
                        { path: '/adminbay', name: 'TestComponent', component: items_component_1.ItemComponent }
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