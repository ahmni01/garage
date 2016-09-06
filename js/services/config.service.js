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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/retry');
var ConfigService = (function () {
    function ConfigService(_http) {
        this._http = _http;
        this.configUrl = 'app/resources/config.properties';
    }
    ConfigService.prototype.loadConfig = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, body: '' });
        return this._http.get(this.configUrl, options)
            .retry(3)
            .map(this.extractData);
        //.catch(this.exceptionHandler);                           
    };
    ConfigService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300)
            throw new Error('Bad response status: ' + res.status);
        var body = res.json();
        this.apiVersion = body.apiVersion;
        sessionStorage.setItem('api_version', this.apiVersion);
        //console.log("API Version : " + sessionStorage.getItem('api_version'));
        this.apiUrl = body.apiBaseUrl;
        this.apiUrl = this.apiUrl + '/' + this.apiVersion + '/';
        sessionStorage.setItem('api_base_url', this.apiUrl);
        //console.log("Base Url : " + sessionStorage.getItem('api_base_url'));           
        //this.userName = body.userName;
        //sessionStorage.setItem('username', this.userName);
        //console.log("username : " + sessionStorage.getItem('username'));
        //this.password = body.password;
        //sessionStorage.setItem('password', this.password);
        //console.log("password : " + sessionStorage.getItem('password'));
        //console.log("Token Expires@" + this._tokenExpirationDateTime);           
        //sessionStorage.setItem('id_token', this._token);                            
        return body.data || {};
    };
    ConfigService.prototype.exceptionHandler = function (error) {
        console.log(error);
        return Observable_1.Observable.throw(error.json().error || 'Encountered Error!!');
    };
    ConfigService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map