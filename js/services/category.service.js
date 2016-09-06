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
var CategoryService = (function () {
    function CategoryService(_http) {
        this._http = _http;
        //private _categoryUrl = 'http://ahmni01-i168061:8080/rest/default/garage/v1/category';
        this._categoryUrl = sessionStorage.getItem('api_base_url') + 'category';
    }
    CategoryService.prototype.getCategories = function () {
        var apiHeaders = new http_1.Headers();
        //console.log("<= Session Token => " + localStorage.getItem('id_token'));
        var _token = sessionStorage.getItem('id_token');
        apiHeaders.append('Authorization', _token);
        apiHeaders.append('Content-Type', 'application/json');
        //console.log('Content-Type : ' + apiHeaders.get('Content-Type'));
        return this._http.get(this._categoryUrl, {
            headers: apiHeaders,
            body: ''
        })
            .retry(3)
            .map(function (response) { return response.json(); });
        //.do(data => {
        // console.log("RecievedData: " + JSON.stringify(data))   
        //}                       
        //)
        //.catch(this.exceptionHandler);                        
    };
    CategoryService.prototype.exceptionHandler = function (error) {
        console.log(error);
        return Observable_1.Observable.throw(error.json().error || 'Encountered Error!!');
    };
    CategoryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CategoryService);
    return CategoryService;
}());
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map