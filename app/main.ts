import {bootstrap}    from '@angular/platform-browser-dynamic';
import {MainComponent} from './app.component';
import {AuthTokenService} from './services/auth.token.service'

bootstrap(MainComponent, [AuthTokenService]);

