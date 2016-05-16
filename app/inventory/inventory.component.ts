import {Component, OnInit}  from '@angular/core';
import {NgForm}    from '@angular/common';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes} from '@angular/router';

import {Inventory}    from './inventory';
import {CategoryService} from '../services/category.service';
import {InventoryService} from '../services/inventory.service';
import {InventoryFilterPipe} from './inventory-filter.pipe';
import {AuthTokenService} from '../services/auth.token.service';

@Component({  
  templateUrl: 'app/inventory/inventory.component.html',
  pipes: [InventoryFilterPipe],
  directives: [ROUTER_DIRECTIVES],
  providers:[ROUTER_PROVIDERS, CategoryService, InventoryService, AuthTokenService]
})
export class InventoryComponent implements OnInit {
  categories: any;
  inventory: Inventory[]; 
  token:any;
  constructor(private _categoryService: CategoryService, 
                private _inventoryService: InventoryService,
                private _authTokenService: AuthTokenService){
  }  
  
  ngOnInit():void{
  this._authTokenService.getToken()
  .subscribe(token => {
    this.token = token;
    console.log("token recieved??? : " + token);   
  });  
    
  this._categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
      
  this._inventoryService.getInventory()
      .subscribe(Item => this.inventory = Item);
  }

  listFilter: string = '';  
  
  //model:Item;
  model = new Inventory(1, '', '', '' );  
 
  submitted = false;

  onSubmit() { this.submitted = true; 
      console.log('Form field values are : ' + JSON.stringify(this.model));
      //this.inventory.push(this.model);
      console.log(':::::this.model.category : ' + this.model.category.toString());
      }
      
      onChange(deviceValue) {
  //  console.log(deviceValue);
   // console.log(JSON.stringify(deviceValue).toString());
    
   // this.model.category = newValue;
    // ... do other stuff here ...
}

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  // Reset the form with a new object AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;

  showFormControls(form:NgForm){

    return form && form.controls['name'] &&
    form.controls['name'].value; // Dr. IQ
  }

  /////////////////////////////

}



