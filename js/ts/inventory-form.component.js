System.register(['angular2/core', 'angular2/router', './inventory', './item-filter.pipe'], function(exports_1, context_1) {
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
    var core_1, router_1, inventory_1, item_filter_pipe_1;
    var ItemFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (inventory_1_1) {
                inventory_1 = inventory_1_1;
            },
            function (item_filter_pipe_1_1) {
                item_filter_pipe_1 = item_filter_pipe_1_1;
            }],
        execute: function() {
            ItemFormComponent = (function () {
                function ItemFormComponent() {
                    this.listFilter = '';
                    this.category = ['Lego', 'Drone', 'Book', 'AI-KIT'];
                    this.model = new inventory_1.Item(1, '', 'BostonDynamics', 'Books', true);
                    this.items = [
                        { id: 1, name: 'Lego', availableSince: '0216', count: 100, contact: 'Prabhjoth', cost: 'Free', manufacturer: 'LEGO.COM', category: 'Lego', available: false, availableCount: 0 },
                        { id: 2, name: 'Mini-Drone', availableSince: '0216', count: 5, contact: 'Prabhjoth', cost: '100$ - Charge Back to BU', manufacturer: 'Syma', category: 'Drone', available: true, availableCount: 3 },
                        { id: 3, name: 'Raspberry PI v1', availableSince: '0216', count: 10, contact: 'Shawali', cost: '10$ - Charge Back to BU', manufacturer: 'RASPBERRY PI FOUNDATION', category: 'Rasperry', available: true, availableCount: 5 },
                        { id: 4, name: 'Raspberry PI v2', availableSince: '0216', count: 20, contact: 'Shawali', cost: '10$ - Charge Back to BU', manufacturer: 'RASPBERRY PI FOUNDATION', category: 'Rasperry', available: true, availableCount: 5 },
                        { id: 5, name: 'Raspberry PI v3', availableSince: '0216', count: 50, contact: 'Shawali', cost: '10$ - Charge Back to BU', manufacturer: 'RASPBERRY PI FOUNDATION', category: 'Rasperry', available: true, availableCount: 10 },
                        { id: 6, name: 'AI-Kit 1.0', availableSince: '0216', count: 10, contact: 'Shawali', cost: '10$ - Charge Back to BU', manufacturer: 'AI-Kit Vendor', category: 'AI-Kit', available: false, availableCount: 0 }
                    ];
                    this.submitted = false;
                    // Reset the form with a new object AND restore 'pristine' class state
                    // by toggling 'active' flag which causes the form
                    // to be removed/re-added in a tick via NgIf
                    // TODO: Workaround until NgForm has a reset method (#6822)
                    this.active = true;
                }
                ItemFormComponent.prototype.onSubmit = function () {
                    this.submitted = true;
                    //console.log(      JSON.stringify(this.model));
                    this.items.push(this.model);
                };
                Object.defineProperty(ItemFormComponent.prototype, "diagnostic", {
                    // TODO: Remove this when we're done
                    get: function () { return JSON.stringify(this.model); },
                    enumerable: true,
                    configurable: true
                });
                ItemFormComponent.prototype.newHero = function () {
                    var _this = this;
                    this.model = new inventory_1.Item(42, 'vvvvv', '', 'bbbbbb');
                    this.active = false;
                    setTimeout(function () { return _this.active = true; }, 0);
                };
                //////// NOT SHOWN IN DOCS ////////
                ItemFormComponent.prototype.showFormControls = function (form) {
                    return form && form.controls['name'] &&
                        form.controls['name'].value; // Dr. IQ
                };
                ItemFormComponent = __decorate([
                    core_1.Component({
                        selector: 'item-form',
                        templateUrl: 'app/Items/inventory-form.component.html',
                        pipes: [item_filter_pipe_1.ItemFilterPipe],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [router_1.ROUTER_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ItemFormComponent);
                return ItemFormComponent;
            }());
            exports_1("ItemFormComponent", ItemFormComponent);
        }
    }
});
//# sourceMappingURL=inventory-form.component.js.map