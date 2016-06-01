System.register(['@angular/core', '@angular/router', '../services/inventory.service'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, inventory_service_1;
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
            function (inventory_service_1_1) {
                inventory_service_1 = inventory_service_1_1;
            }],
        execute: function() {
            InventoryDetailsComponent = (function () {
                function InventoryDetailsComponent(_inventoryService, _router) {
                    this._inventoryService = _inventoryService;
                    this._router = _router;
                    this.pageTitle = 'Inventory details';
                }
                InventoryDetailsComponent.prototype.routerOnActivate = function (curr) {
                    var id = +curr.getParam('id');
                    this.pageTitle = this.pageTitle + ':';
                    this.searchInventory(id);
                };
                InventoryDetailsComponent.prototype.searchInventory = function (id) {
                    var _this = this;
                    this._inventoryService.searchInventory(id)
                        .subscribe(function (inventory) { return _this.inventoryDetails = inventory; }, function (error) { return _this.errorMessage = error; });
                    console.log("###id####" + id);
                    //this.inventory  = this._inventoryService.findInventoryByID(id);
                    //this._inventoryService.findInventoryByID(id).subscribe(inventory => this.inventoryDetails = inventory);
                    //console.log("###this.inventory.name####" +this.inventoryDetails.name)
                };
                InventoryDetailsComponent.prototype.onBack = function () {
                    this._router.navigate(['/adminbay']);
                };
                InventoryDetailsComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/inventory/inventory-details.component.html',
                        directives: [router_2.ROUTER_DIRECTIVES],
                        providers: [inventory_service_1.InventoryService]
                    }), 
                    __metadata('design:paramtypes', [inventory_service_1.InventoryService, router_1.Router])
                ], InventoryDetailsComponent);
                return InventoryDetailsComponent;
            }());
            exports_1("InventoryDetailsComponent", InventoryDetailsComponent);
        }
    }
});
//# sourceMappingURL=inventory-details.component.js.map