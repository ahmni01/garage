System.register(['@angular/core', '@angular/router', './inventory', '../services/category.service', '../services/inventory.service', './inventory-filter.pipe', '../services/auth.token.service'], function(exports_1, context_1) {
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
    var core_1, router_1, inventory_1, category_service_1, inventory_service_1, inventory_filter_pipe_1, auth_token_service_1;
    var InventoryComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (inventory_1_1) {
                inventory_1 = inventory_1_1;
            },
            function (category_service_1_1) {
                category_service_1 = category_service_1_1;
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
            InventoryComponent = (function () {
                function InventoryComponent(_categoryService, _inventoryService, _authTokenService) {
                    this._categoryService = _categoryService;
                    this._inventoryService = _inventoryService;
                    this._authTokenService = _authTokenService;
                    this.listFilter = '';
                    //model:Item;
                    this.model = new inventory_1.Inventory(1, '', '', '');
                    this.submitted = false;
                    // Reset the form with a new object AND restore 'pristine' class state
                    // by toggling 'active' flag which causes the form
                    // to be removed/re-added in a tick via NgIf
                    // TODO: Workaround until NgForm has a reset method (#6822)
                    this.active = true;
                }
                InventoryComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._authTokenService.getToken()
                        .subscribe(function (token) {
                        _this.token = token;
                        console.log("token recieved??? : " + token);
                    });
                    this._categoryService.getCategories()
                        .subscribe(function (categories) { return _this.categories = categories; });
                    this._inventoryService.getInventory()
                        .subscribe(function (Item) { return _this.inventory = Item; });
                };
                InventoryComponent.prototype.onSubmit = function () {
                    this.submitted = true;
                    console.log('Form field values are : ' + JSON.stringify(this.model));
                    //this.inventory.push(this.model);
                    console.log(':::::this.model.category : ' + this.model.category.toString());
                };
                InventoryComponent.prototype.onChange = function (deviceValue) {
                    //  console.log(deviceValue);
                    // console.log(JSON.stringify(deviceValue).toString());
                    // this.model.category = newValue;
                    // ... do other stuff here ...
                };
                Object.defineProperty(InventoryComponent.prototype, "diagnostic", {
                    // TODO: Remove this when we're done
                    get: function () { return JSON.stringify(this.model); },
                    enumerable: true,
                    configurable: true
                });
                InventoryComponent.prototype.showFormControls = function (form) {
                    return form && form.controls['name'] &&
                        form.controls['name'].value; // Dr. IQ
                };
                InventoryComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/inventory/inventory.component.html',
                        pipes: [inventory_filter_pipe_1.InventoryFilterPipe],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [router_1.ROUTER_PROVIDERS, category_service_1.CategoryService, inventory_service_1.InventoryService, auth_token_service_1.AuthTokenService]
                    }), 
                    __metadata('design:paramtypes', [category_service_1.CategoryService, inventory_service_1.InventoryService, auth_token_service_1.AuthTokenService])
                ], InventoryComponent);
                return InventoryComponent;
            }());
            exports_1("InventoryComponent", InventoryComponent);
        }
    }
});
//# sourceMappingURL=inventory.component.js.map