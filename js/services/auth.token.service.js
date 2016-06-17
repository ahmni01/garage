System.register(['@angular/core', '@angular/http', 'rxjs/Observable', './config.service'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, config_service_1;
    var AuthTokenService;
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
            function (config_service_1_1) {
                config_service_1 = config_service_1_1;
            }],
        execute: function() {
            AuthTokenService = (function () {
                function AuthTokenService(_http, _configService) {
                    this._http = _http;
                    this._configService = _configService;
                    //private _tokenUrl = 'http://ahmni01-i168061:8080/rest/default/garage/v1/@authentication';
                    this._tokenUrl = sessionStorage.getItem('api_base_url') + '@authentication';
                }
                AuthTokenService.prototype.ngOnInit = function () {
                    this.getConfig();
                };
                AuthTokenService.prototype.getConfig = function () {
                    var _this = this;
                    this._configService.loadConfig()
                        .subscribe(function (_dataFromConfig) { return _this._dataFromConfig = _dataFromConfig; });
                };
                AuthTokenService.prototype.getToken = function () {
                    this.getConfig();
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var body = JSON.stringify({ "username": "demo", "password": "Password1" });
                    return this._http.post(this._tokenUrl, body, options)
                        .map(this.extractData)
                        .catch(this.exceptionHandler);
                };
                AuthTokenService.prototype.extractData = function (res) {
                    if (res.status < 200 || res.status >= 300)
                        throw new Error('Bad response status: ' + res.status);
                    var body = res.json();
                    this._token = 'CALiveAPICreator ' + body.apikey + ':1';
                    this._tokenExpirationDateTime = body.expiration;
                    var tokenExpiresIn = new Date(this._tokenExpirationDateTime).getTime() - new Date().getTime();
                    //console.log("Token Expires in : " + tokenExpiresIn + ' milleseconds, ' + tokenExpiresIn/(1000*60) + ' minutes');
                    sessionStorage.setItem('id_token', this._token);
                    return body.data || {};
                };
                AuthTokenService.prototype.exceptionHandler = function (error) {
                    console.log(error);
                    return Observable_1.Observable.throw(error.json().error || 'Encountered Error!!');
                };
                AuthTokenService = __decorate([
                    core_1.Component({
                        providers: [config_service_1.ConfigService]
                    }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, config_service_1.ConfigService])
                ], AuthTokenService);
                return AuthTokenService;
            }());
            exports_1("AuthTokenService", AuthTokenService);
        }
    }
});
//# sourceMappingURL=auth.token.service.js.map