System.register(['@angular/core', '@angular/router', '../services/inventory.service', '../inventory/inventory-filter.pipe', '../services/auth.token.service'], function(exports_1, context_1) {
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
    var core_1, router_1, inventory_service_1, inventory_filter_pipe_1, auth_token_service_1;
    var AdminBayComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (inventory_service_1_1) {
                inventory_service_1 = inventory_service_1_1;
            },
            function (inventory_filter_pipe_1_1) {
                inventory_filter_pipe_1 = inventory_filter_pipe_1_1;
            },
            function (auth_token_service_1_1) {
                auth_token_service_1 = auth_token_service_1_1;
            }],
        execute: function() {
            AdminBayComponent = (function () {
                function AdminBayComponent(_authTokenService, _inventoryService) {
                    this._authTokenService = _authTokenService;
                    this._inventoryService = _inventoryService;
                    this.pageTitle = 'Search & Allocate';
                    this.listFilter = '';
                }
                AdminBayComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._authTokenService.getToken()
                        .subscribe(function (token) {
                        _this.token = token;
                        console.log("AdminBayComponent: token recieved??? : " + token);
                    });
                    this._inventoryService.getInventory()
                        .subscribe(function (inventory) { return _this.inventory = inventory; });
                };
                AdminBayComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/adminbay/adminbay.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        pipes: [inventory_filter_pipe_1.InventoryFilterPipe],
                        providers: [inventory_service_1.InventoryService, auth_token_service_1.AuthTokenService]
                    }), 
                    __metadata('design:paramtypes', [auth_token_service_1.AuthTokenService, inventory_service_1.InventoryService])
                ], AdminBayComponent);
                return AdminBayComponent;
            }());
            exports_1("AdminBayComponent", AdminBayComponent);
        }
    }
});
//# sourceMappingURL=adminbay.component.js.map