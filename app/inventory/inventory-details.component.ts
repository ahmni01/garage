import {Component}  from '@angular/core';
import {ControlGroup, FormBuilder, Validators, Control} from '@angular/common';
import {Router, OnActivate, RouteSegment} from '@angular/router';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Observable} from 'rxjs/Observable'; 
import {Accordion} from 'primeng/primeng';
import {AccordionTab} from 'primeng/primeng';
import {InputText} from 'primeng/primeng';
import {Panel} from 'primeng/primeng';
import {Calendar} from 'primeng/primeng';
import {Button} from 'primeng/primeng';
import {Dialog} from 'primeng/primeng';
import {Growl} from 'primeng/primeng';
import {Messages} from 'primeng/primeng';

import {InventoryService} from '../services/inventory.service';
import {ReservationService} from '../services/reservation.service'
import {Inventory}    from './inventory';
import {AuthTokenService} from '../services/auth.token.service';

@Component({
    templateUrl: 'app/inventory/inventory-details.component.html',    
       directives: [ROUTER_DIRECTIVES, Accordion, 
                    AccordionTab, InputText, Panel, 
                    Calendar,Button, Dialog, Growl,Messages],
       providers: [InventoryService, ReservationService,AuthTokenService]    
})
export class InventoryDetailsComponent implements OnActivate{
    pageTitle:string = 'Inventory details';
    inventoryDetails: Inventory; 
    newReservation:any;   
    errorMessage: string;
    display: boolean = false;
    disableField:boolean=true;
    disableAssignButton:boolean=false;
    editOrSaveMode = 'Edit';
    assignInventory:boolean = false;
    msgs: Messages[] = [];
    submitted = false;
    form: ControlGroup;
    model:any;
    
    constructor(private _inventoryService: InventoryService, 
                private _reservationService: ReservationService,
                private _router: Router,
                formbuilder: FormBuilder){
                    this.form = formbuilder.group({
                    'userid': new Control('', Validators.compose([Validators.required, Validators.minLength(7),Validators.maxLength(7)])),
                    'username': new Control(''),
                    'toreturndate': new Control('', Validators.required)
             });
    }

showWarn() {
        this.msgs = [];
        this.msgs.push({severity:'warn', summary:'Warn Message', detail:'There are unsaved changes'});
    }    
    
showInfo(messageType:string, basicMessage:string, detailedMessage:string) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary:basicMessage, detail:detailedMessage});
    }
    
    
    showDialog(availability) {        
        if(availability.value == 'yes'){
         this.display = true;
         this.disableAssignButton = false;
        }
        else{
            this.display = false;
            alert("Item is already assigned to some other Employee");
            this.disableAssignButton = true;
        }   
    }



clear() {
        this.msgs = [];
    }        
    
    routerOnActivate(curr: RouteSegment): void {
        let id = +curr.getParam('id');
        this.pageTitle = this.pageTitle + ':';
        this.searchInventory(id);
    }

    searchInventory(id: number) {
       this._inventoryService.searchInventory(id)
            .subscribe(
            inventory => this.inventoryDetails = inventory,
            error => this.errorMessage = <any>error);          
            }
   
    assign(userid:string, inventory_id:string, returnByDate:string,username:string){
        this.submitted = true;
        let bookingDate="";
        let newDate = new Date();

        // Get the month, day, and year.
        bookingDate += (newDate.getMonth() + 1) + "/";
        bookingDate += newDate.getDate() + "/";
        bookingDate += newDate.getFullYear();
     
     let requestBodyForReservation: string = 
      "{\"userid\":\"" + userid +"\",\"username\":\"" + username +"\"" + ",\"inventory_id\":\"" + inventory_id + "\"" + 
      ",\"return_by_date\":\"" + returnByDate + "\",\"booking_date\":\"" + bookingDate + "\"}";   
    
      this._reservationService.addReservation(requestBodyForReservation)
      .subscribe(newReservation => this.newReservation = newReservation);

      //Save to call PUT operation
      let requestBodyForUpdatingInventory:string = 
            "{\"id\":\"" + inventory_id + "\",\"available\": \"no\""  + ",\"current_owner\": \""+ userid + "\""
            + ",\"@metadata\": {\"checksum\": \"override\"}"
            + "}";   
            this._inventoryService.updateExistingInventory(requestBodyForUpdatingInventory)
            .subscribe(editMsg => editMsg = editMsg);

      this.display=false;
      this.showInfo('info', 'Inventory Assigned Successfully', "Inventory ID: " + inventory_id + " is assigned to " + userid);
      this.disableAssignButton = true;

    }    
        onBack(): void {
        this._router.navigate(['/adminbay']);
    }
    
     onEdit(inv_id, inv_name,inv_category,inv_vendorname,inv_vendorcontact,inv_cost,inv_purchasedate): void {
        this.editOrSaveMode='Save';
        let editMsg;

        if(this.disableField==false && this.editOrSaveMode=='Save'){
            if(inv_cost.value=="")
                inv_cost.value=0;
            //Save to call PUT operation
            let requestBody: string = 
            "{\"id\":\"" + inv_id.value +"\",\"name\":\"" +inv_name.value+ "\",\"category\":\""+inv_category.value +"\"" + 
            ",\"purchase_date\":\"" + inv_purchasedate.value + "\",\"vendor_name\":\"" + inv_vendorname.value
            + "\",\"vendor_contact\":\"" + inv_vendorcontact.value + "\",\"cost\":" + inv_cost.value 
            + ",\"@metadata\": {\"checksum\": \"override\"}"
            + "}";   
            this._inventoryService.updateExistingInventory(requestBody)
            .subscribe(editMsg => editMsg = editMsg);
            this.showInfo('info', 'Inventory update:', "Inventory ID: " + inv_id.value + "("+ inv_name.value +") is updated successfully");
        }
        
        else{
            this.disableField=false;          
        }     
    }//onEdit


    onSubmit(value: string) {
        this.submitted = true;
        console.log("JSON.stringify(this.userform.value) - " + JSON.stringify(this.userform.value) )
    }//onSubmit
    
} 