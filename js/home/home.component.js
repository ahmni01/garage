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
var auth_1 = require('../services/auth');
var auth_2 = require('../containers/auth');
var HomeComponent = (function () {
    function HomeComponent(_authService) {
        this._authService = _authService;
        this.pageTitle = 'Welcome to CA Garage!';
        if (this._authService.isAuthorized()) {
            this.loggedin = true;
        }
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.logOff = function () {
        this.loggedin = false;
        this._authService.signout();
    };
    HomeComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/home/home.component.html',
            providers: [auth_1.AuthService, auth_2.Auth]
        }), 
        __metadata('design:paramtypes', [auth_1.AuthService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map