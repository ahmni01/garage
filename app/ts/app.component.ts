import {Component}         from 'angular2/core';
import {ItemFormComponent} from './inventory-form.component'

@Component({
  selector: 'my-app',
  template: '<inventory-form></inventory-form>',
  directives: [ItemFormComponent]
})
export class ItemComponent { }




