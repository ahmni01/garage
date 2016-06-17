import {Component, OnInit}  from '@angular/core';
import {NgForm}    from '@angular/common';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes, Router, OnActivate, RouteSegment} from '@angular/router';
import {Inventory}    from './inventory';
import {CategoryService} from '../services/category.service';
import {InventoryService} from '../services/inventory.service';
import {InventoryFilterPipe} from './inventory-filter.pipe';
import {AuthTokenService} from '../services/auth.token.service';
import {DataTable} from 'primeng/primeng';
import {Column} from 'primeng/primeng';
import {Panel} from 'primeng/primeng';
import {Button} from 'primeng/primeng';

@Component({  
  templateUrl: 'app/inventory/inventory.component.html',
  pipes: [InventoryFilterPipe],
  directives: [ROUTER_DIRECTIVES,DataTable,Column,Panel,Button],
  providers:[ CategoryService, InventoryService, AuthTokenService]
})
export class InventoryComponent implements OnInit {
  categories: any;
  selectedCategory:string;
  inventory: Inventory; 
  inventorsy:any;
  newInventory: Inventory[];
  filterString:string;
  token:any;
  model:any;
  cols: any[];
  constructor(private _categoryService: CategoryService, 
                private _inventoryService: InventoryService,
                private _authTokenService: AuthTokenService,
                private _router: Router){
  }  
  
  ngOnInit():void{
    this.cols = [
            {field: 'id', header: 'ID'},
            {field: 'name', header: 'Name'},
            {field: 'category', header: 'Category'},
            {field: 'purchase_date', header: 'Purchase Date'},
            {field: 'vendor_name', header: 'Vendor Name'},
            {field: 'vendor_contact', header: 'Vendor Contact'},
            {field: 'cost', header: 'Cost'},
            {field: 'available', header: 'Availability'},
        ];        
        
  this.model = new Inventory(100, '', '', '', '' );  

  this._authTokenService.getToken()
  .subscribe(token => {
    this.token = token;
  });  
    
  this._categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
      
this._inventoryService.getInventory()
      .subscribe(inventory => this.inventory = inventory);
}

  listFilter: string = '';  
  submitted = false;

  addInventory() { this.submitted = true;
      //console.log('Form field values are : ' + JSON.stringify(this.model));
      let name:string = this.model.name;
      let category:string = this.model.category;
      let vendor_name:string = this.model.vendor_name;
      let vendor_contact:string = this.model.vendor_contact;
        if (vendor_contact==null) 
          vendor_contact='';      
      let cost:number = this.model.cost;
        if(cost==null)
          cost=0;
      let purchase_date:string = this.model.purchase_date;
        if(purchase_date==null)
          purchase_date='';
          
      let requestBody: string = 
      "{\"name\":\"" + name +"\",\"category\":\"" + category +"\",\"vendor_name\":\"" + vendor_name +"\",\"vendor_contact\":\""
       + vendor_contact + "\",\"cost\":" + cost + ",\"purchase_date\":\"" + purchase_date + "\"}";   
    
      //this.inventory.push(this.model);
      this._inventoryService.addNewInventory(requestBody)
      .subscribe(newInventory => this.newInventory = newInventory);  
      }
      
  onChange(deviceValue:any) {
       this.selectedCategory = deviceValue.target.value;
       this.model.category = this.selectedCategory;
  }
  
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
  active = true;
  showFormControls(form:NgForm){
    return form && form.controls['name'] &&
    form.controls['name'].value; // Dr. IQ
  }
  
          onBackClick(): void {
            this.submitted = false;
        this._router.navigate(['/inventory']);
    }
}



