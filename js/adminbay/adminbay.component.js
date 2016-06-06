System.register(['@angular/core', '@angular/router', 'primeng/primeng', '../services/inventory.service', '../services/reservation.service', 'rxjs/Subject'], function(exports_1, context_1) {
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
    var core_1, router_1, primeng_1, primeng_2, primeng_3, inventory_service_1, reservation_service_1, Subject_1;
    var AdminBayComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
                primeng_2 = primeng_1_1;
                primeng_3 = primeng_1_1;
            },
            function (inventory_service_1_1) {
                inventory_service_1 = inventory_service_1_1;
            },
            function (reservation_service_1_1) {
                reservation_service_1 = reservation_service_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            AdminBayComponent = (function () {
                function AdminBayComponent(_inventoryService, _reservationService) {
                    var _this = this;
                    this._inventoryService = _inventoryService;
                    this._reservationService = _reservationService;
                    this.pageTitle = 'Search & Allocate';
                    this.searchTermStream = new Subject_1.Subject();
                    this.inventoryData = this.searchTermStream
                        .debounceTime(300)
                        .distinctUntilChanged()
                        .switchMap(function (term) { return _this._inventoryService.findInventory(term); });
                }
                AdminBayComponent.prototype.ngOnInit = function () {
                    var _this = this;
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
                AdminBayComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/adminbay/adminbay.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES, primeng_1.Panel, primeng_2.DataTable, primeng_3.Column],
                        providers: [inventory_service_1.InventoryService, reservation_service_1.ReservationService]
                    }), 
                    __metadata('design:paramtypes', [inventory_service_1.InventoryService, reservation_service_1.ReservationService])
                ], AdminBayComponent);
                return AdminBayComponent;
            }());
            exports_1("AdminBayComponent", AdminBayComponent);
        }
    }
});
//# sourceMappingURL=adminbay.component.js.map