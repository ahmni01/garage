import {Component}  from '@angular/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes} from '@angular/router';

@Component({
    templateUrl: 'app/report/report.component.html',
    directives: [ROUTER_DIRECTIVES],
  providers:[ROUTER_PROVIDERS]

})
export class ReportComponent{
    pageTitle:string = 'Reports';
    
   
} 