System.register(['@angular/core', '@angular/common', '@angular/router', 'primeng/primeng', '../services/inventory.service', '../services/reservation.service', '../services/auth.token.service'], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, router_2, primeng_1, primeng_2, primeng_3, primeng_4, primeng_5, primeng_6, primeng_7, primeng_8, primeng_9, inventory_service_1, reservation_service_1, auth_token_service_1;
    var InventoryDetailsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
                primeng_2 = primeng_1_1;
                primeng_3 = primeng_1_1;
                primeng_4 = primeng_1_1;
                primeng_5 = primeng_1_1;
                primeng_6 = primeng_1_1;
                primeng_7 = primeng_1_1;
                primeng_8 = primeng_1_1;
                primeng_9 = primeng_1_1;
            },
            function (inventory_service_1_1) {
                inventory_service_1 = inventory_service_1_1;
            },
            function (reservation_service_1_1) {
                reservation_service_1 = reservation_service_1_1;
            },
            function (auth_token_service_1_1) {
                auth_token_service_1 = auth_token_service_1_1;
            }],
        execute: function() {
            InventoryDetailsComponent = (function () {
                function InventoryDetailsComponent(_inventoryService, _reservationService, _router, formbuilder) {
                    this._inventoryService = _inventoryService;
                    this._reservationService = _reservationService;
                    this._router = _router;
                    this.pageTitle = 'Inventory details';
                    this.display = false;
                    this.disableField = true;
                    this.disableAssignButton = false;
                    this.editOrSaveMode = 'Edit';
                    this.assignInventory = false;
                    this.msgs = [];
                    this.submitted = false;
                    this.form = formbuilder.group({
                        'userid': new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(7), common_1.Validators.maxLength(7)])),
                        'username': new common_1.Control(''),
                        'toreturndate': new common_1.Control('', common_1.Validators.required)
                    });
                }
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
                        alert("Item is already assigned to some other Employee");
                        this.disableAssignButton = true;
                    }
                };
                InventoryDetailsComponent.prototype.clear = function () {
                    this.msgs = [];
                };
                InventoryDetailsComponent.prototype.routerOnActivate = function (curr) {
                    var id = +curr.getParam('id');
                    this.pageTitle = this.pageTitle + ':';
                    this.searchInventory(id);
                };
                InventoryDetailsComponent.prototype.searchInventory = function (id) {
                    var _this = this;
                    this._inventoryService.searchInventory(id)
                        .subscribe(function (inventory) { return _this.inventoryDetails = inventory; }, function (error) { return _this.errorMessage = error; });
                };
                InventoryDetailsComponent.prototype.assign = function (userid, inventory_id, returnByDate, username) {
                    var _this = this;
                    this.submitted = true;
                    var bookingDate = "";
                    var newDate = new Date();
                    // Get the month, day, and year.
                    bookingDate += (newDate.getMonth() + 1) + "/";
                    bookingDate += newDate.getDate() + "/";
                    bookingDate += newDate.getFullYear();
                    var requestBodyForReservation = "{\"userid\":\"" + userid + "\",\"username\":\"" + username + "\"" + ",\"inventory_id\":\"" + inventory_id + "\"" +
                        ",\"return_by_date\":\"" + returnByDate + "\",\"booking_date\":\"" + bookingDate + "\"}";
                    this._reservationService.addReservation(requestBodyForReservation)
                        .subscribe(function (newReservation) { return _this.newReservation = newReservation; });
                    //Save to call PUT operation
                    var requestBodyForUpdatingInventory = "{\"id\":\"" + inventory_id + "\",\"available\": \"no\"" + ",\"current_owner\": \"" + userid + "\""
                        + ",\"@metadata\": {\"checksum\": \"override\"}"
                        + "}";
                    this._inventoryService.updateExistingInventory(requestBodyForUpdatingInventory)
                        .subscribe(function (editMsg) { return editMsg = editMsg; });
                    this.display = false;
                    this.showInfo('info', 'Inventory Assigned Successfully', "Inventory ID: " + inventory_id + " is assigned to " + userid);
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
                    console.log("JSON.stringify(this.userform.value) - " + JSON.stringify(this.userform.value));
                }; //onSubmit
                InventoryDetailsComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/inventory/inventory-details.component.html',
                        directives: [router_2.ROUTER_DIRECTIVES, primeng_1.Accordion,
                            primeng_2.AccordionTab, primeng_3.InputText, primeng_4.Panel,
                            primeng_5.Calendar, primeng_6.Button, primeng_7.Dialog, primeng_8.Growl, primeng_9.Messages],
                        providers: [inventory_service_1.InventoryService, reservation_service_1.ReservationService, auth_token_service_1.AuthTokenService]
                    }), 
                    __metadata('design:paramtypes', [inventory_service_1.InventoryService, reservation_service_1.ReservationService, router_1.Router, common_1.FormBuilder])
                ], InventoryDetailsComponent);
                return InventoryDetailsComponent;
            }());
            exports_1("InventoryDetailsComponent", InventoryDetailsComponent);
        }
    }
});
//# sourceMappingURL=inventory-details.component.js.map