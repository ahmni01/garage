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
//import { StoreHelper } from './store-helper';
//import { Store} from '../store';
var api_1 = require('./api');
var router_1 = require('@angular/router');
require('rxjs/Rx');
var AuthService = (function () {
    function AuthService(
        //private storeHelper: StoreHelper,
        api, router) {
        this.api = api;
        this.router = router;
        this.JWT_KEY = 'id_token';
        this.JWT_EXPIRY = 'id_token_expiration';
        var token = sessionStorage.getItem(this.JWT_KEY);
        if (token) {
            this.setJwt(token);
        }
    }
    AuthService.prototype.setJwt = function (jwt) {
        sessionStorage.setItem(this.JWT_KEY, jwt);
        this.api.setHeaders({ Authorization: "Bearer " + jwt });
    };
    AuthService.prototype.setTokenExpiry = function (tokenExpiry) {
        sessionStorage.setItem(this.JWT_EXPIRY, tokenExpiry);
    };
    AuthService.prototype.isAuthorized = function () {
        var tokenExpiry = sessionStorage.getItem(this.JWT_EXPIRY);
        var tokenExpiryInMilliSeconds = new Date(tokenExpiry).getTime() - new Date().getTime();
        var tokenExpiryInMinutes = (tokenExpiryInMilliSeconds / (1000 * 60)).toFixed().toString();
        console.log('tokenExpiryInMinutes (Left for debugging) - ' + tokenExpiryInMinutes);
        if (Number(tokenExpiryInMinutes) < 15) {
            console.log("Token Expired, Enforcing login...");
            return false;
        }
        else
            return Boolean(sessionStorage.getItem(this.JWT_KEY));
    };
    AuthService.prototype.canActivate = function () {
        var isAuth = this.isAuthorized();
        if (!isAuth) {
            this.router.navigate(['', 'auth']);
        }
        return isAuth;
    };
    AuthService.prototype.authenticate = function (path, creds) {
        var _this = this;
        return this.api.post("/" + path, creds)
            .do(function (res) { return _this.setJwt('CALiveAPICreator ' + res.apikey + ':1'); })
            .do(function (res) { return _this.setTokenExpiry(res.expiration); })
            .map(function (res) { return res.data; });
    };
    AuthService.prototype.signout = function () {
        sessionStorage.removeItem(this.JWT_KEY);
        sessionStorage.removeItem(this.JWT_EXPIRY);
        //this.store.purge();
        this.router.navigate(['', 'auth']);
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [api_1.ApiService, router_1.Router])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.js.map