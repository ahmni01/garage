System.register(['angular2/core', './inventory/inventory', './inventory/inventory-filter.pipe', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, inventory_1, inventory_filter_pipe_1, router_1;
    var ItemComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (inventory_1_1) {
                inventory_1 = inventory_1_1;
            },
            function (inventory_filter_pipe_1_1) {
                inventory_filter_pipe_1 = inventory_filter_pipe_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ItemComponent = (function () {
                function ItemComponent() {
                    this.listFilter = '';
                    //category = ['Lego', 'Drone','Book', 'AI-KIT'];
                    this.model = new inventory_1.Inventory(1, '', 'BostonDynamics', 'Books', 'ssss');
                    this.items = [
                        { id: 1, name: 'Lego', vendor_contact: 'Prabhjoth', cost: 0, vendor_name: 'LEGO.COM', category: 'Lego', purchase_date: 'false' },
                        { id: 2, name: 'Mini-Drone', vendor_contact: 'Prabhjoth', cost: 100, vendor_name: 'Syma', category: 'Drone', purchase_date: 'false' },
                        { id: 3, name: 'Raspberry PI v1', vendor_contact: 'Shawali', cost: 10, vendor_name: 'RASPBERRY PI FOUNDATION', category: 'Rasperry', purchase_date: 'false' },
                        { id: 4, name: 'Raspberry PI v2', vendor_contact: 'Shawali', cost: 15, vendor_name: 'RASPBERRY PI FOUNDATION', category: 'Rasperry', purchase_date: 'false' },
                        { id: 5, name: 'Raspberry PI v3', vendor_contact: 'Shawali', cost: 20, vendor_name: 'RASPBERRY PI FOUNDATION', category: 'Rasperry', purchase_date: 'false' },
                        { id: 6, name: 'AI-Kit 1.0', vendor_contact: 'Shawali', cost: 50, vendor_name: 'AI-Kit Vendor', category: 'AI-Kit', purchase_date: 'false' }
                    ];
                }
                ItemComponent = __decorate([
                    core_1.Component({
                        selector: 'itemlist-component',
                        templateUrl: 'app/items.html',
                        pipes: [inventory_filter_pipe_1.InventoryFilterPipe],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ItemComponent);
                return ItemComponent;
            }());
            exports_1("ItemComponent", ItemComponent);
        }
    }
});
//# sourceMappingURL=items.component.js.map