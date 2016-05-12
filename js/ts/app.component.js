System.register(['angular2/core', './inventory-form.component', './item-information.component', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, inventory_form_component_1, item_information_component_1, router_1;
    var ItemComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (inventory_form_component_1_1) {
                inventory_form_component_1 = inventory_form_component_1_1;
            },
            function (item_information_component_1_1) {
                item_information_component_1 = item_information_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ItemComponent = (function () {
                function ItemComponent() {
                    this.pageTitle = 'CA GARAGE!';
                }
                ItemComponent = __decorate([
                    core_1.Component({
                        selector: 'garage-app',
                        template: "\n    <div class='container'>\n  <router-outlet></router-outlet>\n  </div>\n\n<!--<item-form></item-form>  -->",
                        directives: [inventory_form_component_1.ItemFormComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [router_1.ROUTER_PROVIDERS]
                    }),
                    router_1.RouteConfig([
                        { path: '/welcome', name: 'Welcome', component: inventory_form_component_1.ItemFormComponent, useAsDefault: true },
                        { path: '/items', name: 'Items', component: item_information_component_1.ItemInformationComponent },
                        { path: '/item/:id', name: 'ItemInformation', component: item_information_component_1.ItemInformationComponent },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], ItemComponent);
                return ItemComponent;
            }());
            exports_1("ItemComponent", ItemComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map