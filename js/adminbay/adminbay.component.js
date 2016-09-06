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
var primeng_1 = require('primeng/primeng');
var primeng_2 = require('primeng/primeng');
var primeng_3 = require('primeng/primeng');
var primeng_4 = require('primeng/primeng');
var primeng_5 = require('primeng/primeng');
var primeng_6 = require('primeng/primeng');
var primeng_7 = require('primeng/primeng');
var inventory_service_1 = require('../services/inventory.service');
var reservation_service_1 = require('../services/reservation.service');
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/switchMap');
var auth_1 = require('../services/auth');
var AdminBayComponent = (function () {
    function AdminBayComponent(_inventoryService, _reservationService, _authService) {
        var _this = this;
        this._inventoryService = _inventoryService;
        this._reservationService = _reservationService;
        this._authService = _authService;
        this.pageTitle = 'Search & Allocate';
        this.searchTermStream = new Subject_1.Subject();
        this.msgs = [];
        this.displayReturnInvDialog = false;
        this.inventoryData = this.searchTermStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) { return _this._inventoryService.findInventory(term); });
        if (this._authService.isAuthorized()) {
            this.loggedin = true;
        }
    }
    AdminBayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._reservationService.getAllReservationInfo()
            .subscribe(function (reservation) { return _this.reservation = reservation; });
    };
    AdminBayComponent.prototype.showInfo = function (messageType, basicMessage, detailedMessage) {
        this.msgs = [];
        this.msgs.push({ severity: messageType, summary: basicMessage, detail: detailedMessage });
    };
    AdminBayComponent.prototype.showReturnInvWarningDialog = function (reservationRow) {
        this.reservationRow = reservationRow;
        this.displayReturnInvDialog = true;
    };
    AdminBayComponent.prototype.confirmInvReturn = function () {
        this.returnInventory(this.reservationRow);
    };
    AdminBayComponent.prototype.returnInventory = function (reservationRow) {
        var _this = this;
        var reservationReturnDate = "";
        var newDate = new Date();
        // Get the month, day, and year.
        reservationReturnDate += (newDate.getMonth() + 1) + "/";
        reservationReturnDate += newDate.getDate() + "/";
        reservationReturnDate += newDate.getFullYear();
        //Save to call PUT operation
        var payloadForReturningReservation = "{\"reservation_id\":" + reservationRow.reservation_id + ",\"returned_date\": \"" + reservationReturnDate + "\""
            + ",\"@metadata\": {\"checksum\": \"override\"}"
            + "}";
        this._reservationService.updateReservation(payloadForReturningReservation)
            .subscribe(function (editMsg) { return editMsg = editMsg; });
        //Save to call PUT operation
        var requestBodyForUpdatingInventory = "{\"id\":\"" + reservationRow.inventory_id + "\",\"available\": \"yes\"" + ",\"current_owner\": \"none\""
            + ",\"@metadata\": {\"checksum\": \"override\"}"
            + "}";
        this._inventoryService.updateExistingInventory(requestBodyForUpdatingInventory)
            .subscribe(function (editMsg) { return editMsg = editMsg; });
        this.showInfo('info', 'Inventory Returned Successfully', "Inventory ID: " + reservationRow.reservation_id + " is now available for checkout");
        this._reservationService.getAllReservationInfo()
            .subscribe(function (reservation) { return _this.reservation = reservation; });
    };
    AdminBayComponent.prototype.search = function (term) {
        if (!term) {
            return;
        }
        ;
        this.searchTermStream.next(term);
    };
    AdminBayComponent.prototype.logOff = function () {
        this.loggedin = false;
        this._authService.signout();
    };
    AdminBayComponent.prototype.refreshReservation = function () {
        var _this = this;
        this._reservationService.getAllReservationInfo()
            .subscribe(function (reservation) { return _this.reservation = reservation; });
    };
    AdminBayComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/adminbay/adminbay.component.html',
            directives: [primeng_1.Panel, primeng_2.DataTable,
                primeng_3.Column, primeng_4.Button, primeng_6.Dialog, primeng_7.Toolbar, primeng_5.Messages],
            providers: [inventory_service_1.InventoryService, reservation_service_1.ReservationService]
        }), 
        __metadata('design:paramtypes', [inventory_service_1.InventoryService, reservation_service_1.ReservationService, auth_1.AuthService])
    ], AdminBayComponent);
    return AdminBayComponent;
}());
exports.AdminBayComponent = AdminBayComponent;
//# sourceMappingURL=adminbay.component.js.map