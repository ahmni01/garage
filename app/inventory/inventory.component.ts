import {Component, OnInit}  from '@angular/core';
import {NgForm} from '@angular/common';
import {ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';
import {Inventory}    from './inventory';
import {CategoryService} from '../services/category.service';
import {InventoryService} from '../services/inventory.service';
import {InventoryFilterPipe} from './inventory-filter.pipe';
import {DataTable} from 'primeng/primeng';
import {Column} from 'primeng/primeng';
import {Panel} from 'primeng/primeng';
import {Button} from 'primeng/primeng';
import {Fieldset} from 'primeng/primeng';
import {Toolbar} from 'primeng/primeng';
import { AuthService } from '../services/auth';
import { Auth } from '../containers/auth';

@Component({  
  templateUrl: 'app/inventory/inventory.component.html',
  pipes: [InventoryFilterPipe],
  directives: [DataTable,Column,Panel,Button, Fieldset, Toolbar],
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
  numberOfDuplicateRecords:number;
  searchInventory:boolean=false;
  private loggedin:boolean;
  constructor(private _categoryService: CategoryService, 
                private _inventoryService: InventoryService,
                private _router: Router,
                authService:AuthService,
                private _authService:AuthService,
                auth:Auth){
                  this.numberOfDuplicateRecords=0;
                      if(this._authService.isAuthorized()){
              this.loggedin=true;
            }
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
    
  this._categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
      
this._inventoryService.getInventory()
      .subscribe(inventory => this.inventory = inventory);
}

logOff(){
        this.loggedin=false;
        this._authService.signout();
      }

  listFilter: string = '';  
  submitted = false;

  addInventory(inventoryForm:NgForm) { 
     let myName = inventoryForm && inventoryForm.controls['name'] &&
    inventoryForm.controls['name'].value; 
    console.log("Name captured through - " + myName + inventoryForm && inventoryForm.controls['vendorName'] &&
    inventoryForm.controls['vendorName'].value);
    

      this.submitted = true;
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

      let searchFilter:string;
      let searchedInv: Inventory[];
      
      searchFilter = "?sysfilter=equal(name: "+ "\'" + name + "\', category: \'" + category + "\', vendor_name: \'" + vendor_name + "\')";
      console.log("Going to search for " + searchFilter );
          this.numberOfDuplicateRecords = this._inventoryService.findExactInventory(searchFilter);//.subscribe(searchedInv => searchedInv = searchedInv); 
                     //var size = Object.keys(searchedInv).length;

                     console.log('numberOfDuplicateRecords ----' + this.numberOfDuplicateRecords);
                     //console.log("RecievedData: " + JSON.stringify(searchedInv));
        /*  if(this.numberOfDuplicateRecords >0){
            alert("dddddd");
            this.numberOfDuplicateRecords=0;
            return false;
          }*/
          //else{
            console.log("returned??........");
      let requestBody: string = 
      "{\"name\":\"" + name +"\",\"category\":\"" + category +"\",\"vendor_name\":\"" + vendor_name +"\",\"vendor_contact\":\""
       + vendor_contact + "\",\"cost\":" + cost + ",\"purchase_date\":\"" + purchase_date + "\"}";   
    
      //this.inventory.push(this.model);
      this._inventoryService.addNewInventory(requestBody)
      .subscribe(newInventory => this.newInventory = newInventory); 

      //    }
            
       
      
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
  
  onBackClick(inventoryForm:NgForm): void {
    this.refreshInventory();
    this.submitted = false;
    this._router.navigate(['/inventory']);
    this.model = new Inventory(100, '', '', '', '' );
    this.selectedCategory='';
    
    this.active = false;
    setTimeout(() => this.active = true, 0);
    }

  refreshInventory(){
     this._inventoryService.getInventory()
         .subscribe(inventory => this.inventory = inventory);
    }

   toggleSearch():void{
      this.searchInventory = !this.searchInventory;
    }
}



