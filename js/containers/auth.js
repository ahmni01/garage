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
var forms_1 = require('@angular/forms');
var auth_1 = require('../services/auth');
var router_1 = require('@angular/router');
var Auth = (function () {
    function Auth(auth, router) {
        this.auth = auth;
        this.router = router;
        this.user = {
            password: '',
            username: ''
        };
        this.mode = 'signin';
        this.showError = false;
    }
    Auth.prototype.authenticate = function () {
        var _this = this;
        this.auth.authenticate(this.mode, this.user)
            .subscribe(function () { return _this.router.navigate(['']); }, function (err) {
            _this.showError = true;
            if (err.status == 401) {
                _this.errorMessage = "Incorrect username or password";
            }
            else {
                console.log(err);
                _this.errorMessage = "Check if API Server is running and check logs...";
            }
        });
    };
    Auth = __decorate([
        core_1.Component({
            selector: 'auth-container',
            directives: forms_1.FORM_DIRECTIVES.slice(),
            providers: [auth_1.AuthService],
            styles: ["\n    .auth {\n      height: 100%;\n    }\n    input {\n      border-bottom: 1px solid lightgrey;\n    }\n    .ng-invalid.ng-dirty {\n      border-bottom: 1px solid red;\n    }\n    form {\n      width: 100%;\n      border-radius: 2px;\n      background-color: light-grey;\n      padding: 20px;\n      height: 200px;\n    }\n    .inputs {\n      height: 100%;\n      position: relative;\n    }\n    .link {\n      color: lightblue;\n    }\n    .link:hover {\n      background-color: transparent;\n    }\n    .title {\n      font-size: 36px;\n      font-weight: 300;\n      text-transform: capitalize;\n    }\n    .error {\n      color: red;\n      position: absolute;\n      right: 30px;\n    }\n  "],
            template: "\n  <div class=\"auth row center-xs middle-xs\">\n   <h3 class=\"col-md-12 text-center\">CA Garage</h3>\n  <div class=\"col-xs-offset-1 col-xs-10 col-md-offset-4 col-md-4\">\n    <form class=\"signin form-horizontal\" autocomplete=\"off\" (ngSubmit)=\"authenticate()\" #authForm=\"ngForm\">\n        <fieldset>\n            <div class=\"form-group\">\n                <div class=\"alert alert-danger\" role=\"alert\" [hidden] = '!showError' >{{errorMessage}}</div>\n            </div>\n            <div class=\"form-group\"> \n                <div class=\"input-group input-group-lg\">\n                    <span class=\"input-group-addon\">\n                        <i class=\"text-muted glyphicon glyphicon-user\"></i>\n                    </span>\n                    <input type=\"text\" class=\"form-control\" id=\"username\" name=\"username\" placeholder=\"username\"\n                    required [(ngModel)]=\"user.username\" #username=\"ngModel\" >\n                </div>\n                <div class=\"alert alert-danger\" [hidden]=\"username.valid || username.pristine\">username is invalid</div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"input-group input-group-lg\">\n                    <span class=\"input-group-addon\">\n                        <i class=\"text-muted glyphicon glyphicon-asterisk\"></i>\n                    </span>\n                    <input type=\"password\" class=\"form-control\" id=\"password\" name=\"password\" placeholder=\"password\" \n                    required [(ngModel)]=\"user.password\" #password=\"ngModel\" >\n                </div>\n                <div class=\"error\" [hidden]=\"password.valid || password.pristine\">password is required</div>\n            </div>\n            <div class=\"text-center form-group\">\n                <button type=\"submit\" class=\"btn btn-success btn-lg btn-block\" [disabled]=\"!authForm.form.valid\">Login</button>\n            </div>\n        </fieldset>\n    </form>\n    \n</div>\n</div>\n  "
        }), 
        __metadata('design:paramtypes', [auth_1.AuthService, router_1.Router])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map