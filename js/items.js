System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Item;
    return {
        setters:[],
        execute: function() {
            Item = (function () {
                function Item(id, name, category, vendor_name, contact, cost, availableSince) {
                    this.id = id;
                    this.name = name;
                    this.category = category;
                    this.vendor_name = vendor_name;
                    this.contact = contact;
                    this.cost = cost;
                    this.availableSince = availableSince;
                }
                return Item;
            }());
            exports_1("Item", Item);
        }
    }
});
//# sourceMappingURL=items.js.map