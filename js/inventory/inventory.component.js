"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var inventory_1 = require('./inventory');
var category_service_1 = require('../services/category.service');
var inventory_service_1 = require('../services/inventory.service');
var inventory_filter_pipe_1 = require('./inventory-filter.pipe');
var primeng_1 = require('primeng/primeng');
var primeng_2 = require('primeng/primeng');
var primeng_3 = require('primeng/primeng');
var primeng_4 = require('primeng/primeng');
var primeng_5 = require('primeng/primeng');
var primeng_6 = require('primeng/primeng');
var auth_1 = require('../services/auth');
var auth_2 = require('../containers/auth');
var InventoryComponent = (function () {
    function InventoryComponent(_categoryService, _inventoryService, _router, authService, _authService, auth) {
        this._categoryService = _categoryService;
        this._inventoryService = _inventoryService;
        this._router = _router;
        this._authService = _authService;
        this.searchInventory = false;
        this.listFilter = '';
        this.submitted = false;
        this.active = true;
        this.numberOfDuplicateRecords = 0;
        if (this._authService.isAuthorized()) {
            this.loggedin = true;
        }
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
        this._categoryService.getCategories()
            .subscribe(function (categories) { return _this.categories = categories; });
        this._inventoryService.getInventory()
            .subscribe(function (inventory) { return _this.inventory = inventory; });
    };
    InventoryComponent.prototype.logOff = function () {
        this.loggedin = false;
        this._authService.signout();
    };
    InventoryComponent.prototype.addInventory = function (inventoryForm) {
        var _this = this;
        var myName = inventoryForm && inventoryForm.controls['name'] &&
            inventoryForm.controls['name'].value;
        console.log("Name captured through - " + myName + inventoryForm && inventoryForm.controls['vendorName'] &&
            inventoryForm.controls['vendorName'].value);
        this.submitted = true;
        //console.log('Form field values are : ' + JSON.stringify(this.model));
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
        var searchFilter;
        var searchedInv;
        searchFilter = "?sysfilter=equal(name: " + "\'" + name + "\', category: \'" + category + "\', vendor_name: \'" + vendor_name + "\')";
        console.log("Going to search for " + searchFilter);
        this.numberOfDuplicateRecords = this._inventoryService.findExactInventory(searchFilter); //.subscribe(searchedInv => searchedInv = searchedInv); 
        //var size = Object.keys(searchedInv).length;
        console.log('numberOfDuplicateRecords ----' + this.numberOfDuplicateRecords);
        //console.log("RecievedData: " + JSON.stringify(searchedInv));
        /*  if(this.numberOfDuplicateRecords >0){
            alert("dddddd");
            this.numberOfDuplicateRecords=0;
            return false;
          }*/
        //else{
        console.log("returned??........");
        var requestBody = "{\"name\":\"" + name + "\",\"category\":\"" + category + "\",\"vendor_name\":\"" + vendor_name + "\",\"vendor_contact\":\""
            + vendor_contact + "\",\"cost\":" + cost + ",\"purchase_date\":\"" + purchase_date + "\"}";
        //this.inventory.push(this.model);
        this._inventoryService.addNewInventory(requestBody)
            .subscribe(function (newInventory) { return _this.newInventory = newInventory; });
        //    }
    };
    InventoryComponent.prototype.onChange = function (deviceValue) {
        this.selectedCategory = deviceValue.target.value;
        this.model.category = this.selectedCategory;
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
    InventoryComponent.prototype.onBackClick = function (inventoryForm) {
        var _this = this;
        this.refreshInventory();
        this.submitted = false;
        this._router.navigate(['/inventory']);
        this.model = new inventory_1.Inventory(100, '', '', '', '');
        this.selectedCategory = '';
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 0);
    };
    InventoryComponent.prototype.refreshInventory = function () {
        var _this = this;
        this._inventoryService.getInventory()
            .subscribe(function (inventory) { return _this.inventory = inventory; });
    };
    InventoryComponent.prototype.toggleSearch = function () {
        this.searchInventory = !this.searchInventory;
    };
    InventoryComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/inventory/inventory.component.html',
            pipes: [inventory_filter_pipe_1.InventoryFilterPipe],
            directives: [primeng_1.DataTable, primeng_2.Column, primeng_3.Panel, primeng_4.Button, primeng_5.Fieldset, primeng_6.Toolbar],
        }), 
        __metadata('design:paramtypes', [category_service_1.CategoryService, inventory_service_1.InventoryService, router_1.Router, auth_1.AuthService, auth_1.AuthService, auth_2.Auth])
    ], InventoryComponent);
    return InventoryComponent;
}());
exports.InventoryComponent = InventoryComponent;
//# sourceMappingURL=inventory.component.js.map