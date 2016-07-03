System.register(['@angular/core', '@angular/http', 'rxjs/Observable', 'rxjs/add/operator/retry', './auth.token.service'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, auth_token_service_1;
    var CategoryService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (auth_token_service_1_1) {
                auth_token_service_1 = auth_token_service_1_1;
            }],
        execute: function() {
            CategoryService = (function () {
                function CategoryService(_http, _authTokenService) {
                    this._http = _http;
                    this._authTokenService = _authTokenService;
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
                        headers: apiHeaders
                    })
                        .retry(3)
                        .map(function (response) { return response.json(); })
                        .do(function (data) {
                        // console.log("RecievedData: " + JSON.stringify(data))   
                    })
                        .catch(this.exceptionHandler);
                };
                CategoryService.prototype.exceptionHandler = function (error) {
                    console.log(error);
                    return Observable_1.Observable.throw(error.json().error || 'Encountered Error!!');
                };
                CategoryService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, auth_token_service_1.AuthTokenService])
                ], CategoryService);
                return CategoryService;
            }());
            exports_1("CategoryService", CategoryService);
        }
    }
});
//# sourceMappingURL=category.service.js.map