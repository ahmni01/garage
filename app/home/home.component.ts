import {Component}  from '@angular/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes} from '@angular/router';

@Component({
    templateUrl: 'app/home/home.component.html',
    directives: [ROUTER_DIRECTIVES],
  providers:[ROUTER_PROVIDERS]

})
export class HomeComponent{
    pageTitle:string = 'Welcome to CA Garage!';
    
   
} 