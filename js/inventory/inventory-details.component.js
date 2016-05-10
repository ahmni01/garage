System.register(['angular2/core', 'angular2/router', './inventory-filter.pipe', './inventory.component'], function(exports_1, context_1) {
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
    var core_1, router_1, inventory_filter_pipe_1, router_2, inventory_component_1;
    var InventoryDetailsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (inventory_filter_pipe_1_1) {
                inventory_filter_pipe_1 = inventory_filter_pipe_1_1;
            },
            function (inventory_component_1_1) {
                inventory_component_1 = inventory_component_1_1;
            }],
        execute: function() {
            InventoryDetailsComponent = (function () {
                function InventoryDetailsComponent(_routeParams) {
                    this._routeParams = _routeParams;
                    this.pageTitle = 'Inventory details';
                    var id = +this._routeParams.get('id');
                    this.pageTitle += ": " + id;
                }
                InventoryDetailsComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/inventory/inventory-details.component.html',
                        pipes: [inventory_filter_pipe_1.InventoryFilterPipe],
                        directives: [router_2.ROUTER_DIRECTIVES],
                        providers: [router_2.ROUTER_PROVIDERS, inventory_component_1.InventoryComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], InventoryDetailsComponent);
                return InventoryDetailsComponent;
            }());
            exports_1("InventoryDetailsComponent", InventoryDetailsComponent);
        }
    }
});
//# sourceMappingURL=inventory-details.component.js.map