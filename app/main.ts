import {bootstrap}    from '@angular/platform-browser-dynamic';
import {MainComponent} from './app.component';
import {AuthTokenService} from './services/auth.token.service'
import {ConfigService} from './services/config.service'
import {HTTP_PROVIDERS} from '@angular/http'
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

bootstrap(MainComponent, [HTTP_PROVIDERS]);

