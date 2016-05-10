import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';


@Component({
    templateUrl: 'app/home/home.component.html',
    directives: [ROUTER_DIRECTIVES],
  providers:[ROUTER_PROVIDERS]

})
export class HomeComponent{
    pageTitle:string = 'Welcome to CA Garage!';
    
   
} 