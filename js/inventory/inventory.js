System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Inventory;
    return {
        setters:[],
        execute: function() {
            Inventory = (function () {
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
            exports_1("Inventory", Inventory);
        }
    }
});
//# sourceMappingURL=inventory.js.map