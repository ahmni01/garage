"use strict";
var Inventory = (function () {
    function Inventory(id, name, category, vendor_name, available, vendor_contact, cost, purchase_date) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.vendor_name = vendor_name;
        this.available = available;
        this.vendor_contact = vendor_contact;
        this.cost = cost;
        this.purchase_date = purchase_date;
    }
    return Inventory;
}());
exports.Inventory = Inventory;
//# sourceMappingURL=inventory.js.map