System.register(['@angular/core', '@angular/router', './inventory', '../services/category.service', '../services/inventory.service', './inventory-filter.pipe', '../services/auth.token.service', 'primeng/primeng'], function(exports_1, context_1) {
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
    var core_1, router_1, inventory_1, category_service_1, inventory_service_1, inventory_filter_pipe_1, auth_token_service_1, primeng_1, primeng_2, primeng_3, primeng_4;
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
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
                primeng_2 = primeng_1_1;
                primeng_3 = primeng_1_1;
                primeng_4 = primeng_1_1;
            }],
        execute: function() {
            InventoryComponent = (function () {
                function InventoryComponent(_categoryService, _inventoryService, _authTokenService, _router) {
                    this._categoryService = _categoryService;
                    this._inventoryService = _inventoryService;
                    this._authTokenService = _authTokenService;
                    this._router = _router;
                    this.listFilter = '';
                    this.submitted = false;
                    // Reset the form with a new object AND restore 'pristine' class state
                    // by toggling 'active' flag which causes the form
                    // to be removed/re-added in a tick via NgIf
                    // TODO: Workaround until NgForm has a reset method (#6822)
                    this.active = true;
                }
                InventoryComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.cols = [
                        { field: 'id', header: 'ID' },
                        { field: 'name', header: 'Name' },
                        { field: 'category', header: 'Category' },
                        { field: 'purchase_date', header: 'Purchase Date' },
                        { field: 'vendor_name', header: 'Vendor Name' },
                        { field: 'vendor_contact', header: 'Vendor Contact' },
                        { field: 'cost', header: 'Cost' },
                        { field: 'available', header: 'Availability' },
                    ];
                    this.model = new inventory_1.Inventory(100, '', '', '', '');
                    this._authTokenService.getToken()
                        .subscribe(function (token) {
                        _this.token = token;
                        console.log("Token  : " + token);
                    });
                    this._categoryService.getCategories()
                        .subscribe(function (categories) { return _this.categories = categories; });
                    this._inventoryService.getInventory()
                        .subscribe(function (inventory) { return _this.inventory = inventory; });
                    //this.inventory = this._inventoryService.getInventory();
                };
                InventoryComponent.prototype.addInventory = function () {
                    var _this = this;
                    this.submitted = true;
                    console.log('Form field values are : ' + JSON.stringify(this.model));
                    var name = this.model.name;
                    var category = this.model.category;
                    var vendor_name = this.model.vendor_name;
                    var vendor_contact = this.model.vendor_contact;
                    if (vendor_contact == null)
                        vendor_contact = '';
                    var cost = this.model.cost;
                    if (cost == null)
                        cost = 0;
                    var purchase_date = this.model.purchase_date;
                    if (purchase_date == null)
                        purchase_date = '';
                    console.log('Form field values are : ' + name);
                    console.log('Form field values are : ' + category);
                    console.log('Form field values are : ' + vendor_name);
                    console.log('Form field values are : ' + vendor_contact);
                    console.log('Form field values are : ' + cost);
                    console.log('Form field values are : ' + purchase_date);
                    var requestBody = "{\"name\":\"" + name + "\",\"category\":\"" + category + "\",\"vendor_name\":\"" + vendor_name + "\",\"vendor_contact\":\""
                        + vendor_contact + "\",\"cost\":" + cost + ",\"purchase_date\":\"" + purchase_date + "\"}";
                    console.log('====>>>>>>>>requestBody<<<<<<====== : ' + requestBody);
                    //this.inventory.push(this.model);
                    this._inventoryService.addNewInventory(requestBody)
                        .subscribe(function (newInventory) { return _this.newInventory = newInventory; });
                };
                InventoryComponent.prototype.onChange = function (deviceValue) {
                    this.selectedCategory = deviceValue.target.value;
                    this.model.category = this.selectedCategory;
                    console.log('Selected Category : ' + this.selectedCategory);
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
                InventoryComponent.prototype.onBackClick = function () {
                    this.submitted = false;
                    this._router.navigate(['/inventory']);
                };
                InventoryComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/inventory/inventory.component.html',
                        pipes: [inventory_filter_pipe_1.InventoryFilterPipe],
                        directives: [router_1.ROUTER_DIRECTIVES, primeng_1.DataTable, primeng_2.Column, primeng_3.Panel, primeng_4.Button],
                        providers: [category_service_1.CategoryService, inventory_service_1.InventoryService, auth_token_service_1.AuthTokenService]
                    }), 
                    __metadata('design:paramtypes', [category_service_1.CategoryService, inventory_service_1.InventoryService, auth_token_service_1.AuthTokenService, router_1.Router])
                ], InventoryComponent);
                return InventoryComponent;
            }());
            exports_1("InventoryComponent", InventoryComponent);
        }
    }
});
//# sourceMappingURL=inventory.component.js.map