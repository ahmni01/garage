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
var InventoryFilterPipe = (function () {
    function InventoryFilterPipe() {
    }
    InventoryFilterPipe.prototype.transform = function (value, filter) {
        filter = filter ? filter.toLocaleLowerCase() : null;
        //console.log('Filter by: ' + filter);
        return filter ? value.filter(function (inventory) {
            return inventory.name.toLocaleLowerCase().indexOf(filter) !== -1;
        }) : value;
    };
    InventoryFilterPipe = __decorate([
        core_1.Pipe({
            name: 'itemFilter'
        }), 
        __metadata('design:paramtypes', [])
    ], InventoryFilterPipe);
    return InventoryFilterPipe;
}());
exports.InventoryFilterPipe = InventoryFilterPipe;
//# sourceMappingURL=inventory-filter.pipe.js.map