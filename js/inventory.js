System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Item;
    return {
        setters:[],
        execute: function() {
            Item = (function () {
                function Item(id, name, manufacturer, category, available, availableSince, contact, cost, count, availableCount) {
                    this.id = id;
                    this.name = name;
                    this.manufacturer = manufacturer;
                    this.category = category;
                    this.available = available;
                    this.availableSince = availableSince;
                    this.contact = contact;
                    this.cost = cost;
                    this.count = count;
                    this.availableCount = availableCount;
                }
                return Item;
            }());
            exports_1("Item", Item);
        }
    }
});
//# sourceMappingURL=inventory.js.map