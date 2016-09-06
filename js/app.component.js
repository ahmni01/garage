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
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var config_service_1 = require('./services/config.service');
var auth_1 = require('./services/auth');
var router_2 = require('@angular/router');
var AppComponent = (function () {
    function AppComponent(_configService, _authService) {
        this._configService = _configService;
        this._authService = _authService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._configService.loadConfig()
            .subscribe(function (_dataFromConfig) { return _this._dataFromConfig = _dataFromConfig; });
        if (this._authService.isAuthorized()) {
            this.loggedin = true;
        }
    };
    AppComponent.prototype.showLogout = function () {
        this.loggedin = true;
    };
    AppComponent.prototype.logOff = function () {
        this.loggedin = false;
        this._authService.signout();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'garage-app',
            template: " \n\n    <div class='container-fluid'>\n      <router-outlet></router-outlet>\n    </div> ",
            providers: [router_1.RouterModule,
                http_1.HTTP_PROVIDERS,
                config_service_1.ConfigService
            ],
            directives: [router_2.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [config_service_1.ConfigService, auth_1.AuthService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map