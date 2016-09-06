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
var forms_1 = require('@angular/forms');
var forms_2 = require('@angular/forms');
var router_1 = require('@angular/router');
var primeng_1 = require('primeng/primeng');
var primeng_2 = require('primeng/primeng');
var primeng_3 = require('primeng/primeng');
var primeng_4 = require('primeng/primeng');
var primeng_5 = require('primeng/primeng');
var primeng_6 = require('primeng/primeng');
var primeng_7 = require('primeng/primeng');
var primeng_8 = require('primeng/primeng');
var inventory_service_1 = require('../services/inventory.service');
var reservation_service_1 = require('../services/reservation.service');
var InventoryDetailsComponent = (function () {
    function InventoryDetailsComponent(_inventoryService, _reservationService, _route, formBuilder, _router) {
        this._inventoryService = _inventoryService;
        this._reservationService = _reservationService;
        this._route = _route;
        this.formBuilder = formBuilder;
        this._router = _router;
        this.pageTitle = 'Inventory details';
        this.display = false;
        this.disableField = true;
        this.disableAssignButton = false;
        this.editOrSaveMode = 'Edit';
        this.assignInventory = false;
        this.msgs = [];
        this.submitted = false;
        this.userId = new forms_2.FormControl('', forms_2.Validators.compose([forms_2.Validators.required, forms_2.Validators.minLength(7),
            forms_2.Validators.maxLength(7)]));
        this.toReturnDate = new forms_2.FormControl('', forms_2.Validators.required),
            this.userName = new forms_2.FormControl('');
        this.reservationFormGroup = this.formBuilder.group({
            'userid': this.userId,
            'userName': this.userName,
            'toReturnDate': this.toReturnDate
        });
    }
    InventoryDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            var id = +params['id'];
            _this.pageTitle = _this.pageTitle + ':';
            _this.searchInventory(id);
        });
    };
    InventoryDetailsComponent.prototype.showWarn = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    };
    InventoryDetailsComponent.prototype.showInfo = function (messageType, basicMessage, detailedMessage) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: basicMessage, detail: detailedMessage });
    };
    InventoryDetailsComponent.prototype.showDialog = function (availability) {
        if (availability.value == 'yes') {
            this.display = true;
            this.disableAssignButton = false;
        }
        else {
            this.display = false;
            alert("Item is already checkout out by another Employee");
            this.disableAssignButton = true;
        }
    };
    InventoryDetailsComponent.prototype.clear = function () {
        this.msgs = [];
    };
    InventoryDetailsComponent.prototype.searchInventory = function (id) {
        var _this = this;
        this._inventoryService.searchInventory(id)
            .subscribe(function (inventory) { return _this.inventoryDetails = inventory; }, function (error) { return _this.errorMessage = error; });
    };
    InventoryDetailsComponent.prototype.assign = function () {
        var _this = this;
        this.submitted = true;
        var bookingDate = "";
        var newDate = new Date();
        // Get the month, day, and year.
        bookingDate += (newDate.getMonth() + 1) + "/";
        bookingDate += newDate.getDate() + "/";
        bookingDate += newDate.getFullYear();
        var requestBodyForReservation = "{\"userid\":\"" + this.userId.value + "\",\"username\":\"" + this.userName.value + "\"" + ",\"inventory_id\":\""
            + this.inventoryDetails.id + "\"" +
            ",\"return_by_date\":\"" + this.toReturnDate.value + "\",\"booking_date\":\"" + bookingDate + "\"}";
        console.log("#################" + requestBodyForReservation);
        this._reservationService.addReservation(requestBodyForReservation)
            .subscribe(function (newReservation) { return _this.newReservation = newReservation; });
        //Save to call PUT operation
        var requestBodyForUpdatingInventory = "{\"id\":\"" + this.inventoryDetails.id + "\",\"available\": \"no\"" + ",\"current_owner\": \"" + this.userId.value + "\""
            + ",\"@metadata\": {\"checksum\": \"override\"}"
            + "}";
        this._inventoryService.updateExistingInventory(requestBodyForUpdatingInventory)
            .subscribe(function (editMsg) { return editMsg = editMsg; });
        this.display = false;
        this.showInfo('info', 'Inventory Assigned Successfully', "Inventory ID: " + this.inventoryDetails.id + " is assigned to "
            + this.userId.value);
        this.disableAssignButton = true;
    };
    InventoryDetailsComponent.prototype.onBack = function () {
        this._router.navigate(['/adminbay']);
    };
    InventoryDetailsComponent.prototype.onEdit = function (inv_id, inv_name, inv_category, inv_vendorname, inv_vendorcontact, inv_cost, inv_purchasedate) {
        this.editOrSaveMode = 'Save';
        var editMsg;
        if (this.disableField == false && this.editOrSaveMode == 'Save') {
            if (inv_cost.value == "")
                inv_cost.value = 0;
            //Save to call PUT operation
            var requestBody = "{\"id\":\"" + inv_id.value + "\",\"name\":\"" + inv_name.value + "\",\"category\":\"" + inv_category.value + "\"" +
                ",\"purchase_date\":\"" + inv_purchasedate.value + "\",\"vendor_name\":\"" + inv_vendorname.value
                + "\",\"vendor_contact\":\"" + inv_vendorcontact.value + "\",\"cost\":" + inv_cost.value
                + ",\"@metadata\": {\"checksum\": \"override\"}"
                + "}";
            this._inventoryService.updateExistingInventory(requestBody)
                .subscribe(function (editMsg) { return editMsg = editMsg; });
            this.showInfo('info', 'Inventory update:', "Inventory ID: " + inv_id.value + "(" + inv_name.value + ") is updated successfully");
        }
        else {
            this.disableField = false;
        }
    }; //onEdit
    InventoryDetailsComponent.prototype.onSubmit = function (value) {
        this.submitted = true;
        //console.log("JSON.stringify(this.userform.value) - " + JSON.stringify(this.userform.value) )
    }; //onSubmit
    InventoryDetailsComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/inventory/inventory-details.component.html',
            directives: [primeng_1.Accordion,
                forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES,
                primeng_2.AccordionTab, primeng_3.InputText, primeng_4.Panel,
                primeng_5.Calendar, primeng_6.Button, primeng_7.Dialog, primeng_8.Messages],
            providers: [inventory_service_1.InventoryService,
                reservation_service_1.ReservationService,
                forms_2.FormBuilder]
        }), 
        __metadata('design:paramtypes', [inventory_service_1.InventoryService, reservation_service_1.ReservationService, router_1.ActivatedRoute, forms_2.FormBuilder, router_1.Router])
    ], InventoryDetailsComponent);
    return InventoryDetailsComponent;
}());
exports.InventoryDetailsComponent = InventoryDetailsComponent;
//# sourceMappingURL=inventory-details.component.js.map