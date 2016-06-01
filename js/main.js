System.register(['@angular/platform-browser-dynamic', './app.component', './services/auth.token.service', './services/config.service', '@angular/http', 'rxjs/add/observable/throw', 'rxjs/add/operator/catch', 'rxjs/add/operator/debounceTime', 'rxjs/add/operator/distinctUntilChanged', 'rxjs/add/operator/map', 'rxjs/add/operator/do', 'rxjs/add/operator/switchMap', 'rxjs/add/operator/toPromise'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, app_component_1, auth_token_service_1, config_service_1, http_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (auth_token_service_1_1) {
                auth_token_service_1 = auth_token_service_1_1;
            },
            function (config_service_1_1) {
                config_service_1 = config_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (_4) {},
            function (_5) {},
            function (_6) {},
            function (_7) {},
            function (_8) {}],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(app_component_1.MainComponent, [auth_token_service_1.AuthTokenService, config_service_1.ConfigService, http_1.HTTP_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=main.js.map