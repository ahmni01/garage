import {Component}  from '@angular/core';
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

@Component({
    templateUrl: 'app/inventory/inventory-details.component.html',    
       directives: [ROUTER_DIRECTIVES, Accordion, 
                    AccordionTab, InputText, Panel, 
                    Calendar,Button, Dialog, Growl,Messages],
       providers: [InventoryService, ReservationService]    
})
export class InventoryDetailsComponent implements OnActivate{
    pageTitle:string = 'Inventory details';
    inventoryDetails: Inventory; 
    newReservation:any;   
    errorMessage: string;
    display: boolean = false;
    disableField:boolean=true;
    editOrSaveMode = 'Edit';
    msgs: Messages[] = [];

    
    constructor(private _inventoryService: InventoryService, 
                private _reservationService: ReservationService,
                private _router: Router){
    }
    
    showDialog() {
        this.display = true;
    }
    
showInfo(messageType:string, basicMessage:string, detailedMessage:string) {
        this.msgs = [];
        this.msgs.push({severity: messageType, summary:basicMessage, detail:detailedMessage});
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
          
          
        console.log("###id####" +id);
        //this.inventory  = this._inventoryService.findInventoryByID(id);
          //this._inventoryService.findInventoryByID(id).subscribe(inventory => this.inventoryDetails = inventory);
          //console.log("###this.inventory.name####" +this.inventoryDetails.name)
            }
   
    assign(userid:string, inventory_id:string, returnByDate:string,username:string){
        let bookingDate="";
        let newDate = new Date();

        // Get the month, day, and year.
        bookingDate += (newDate.getMonth() + 1) + "/";
        bookingDate += newDate.getDate() + "/";
        bookingDate += newDate.getFullYear();
     console.log("bookingDate : " +  bookingDate);   
     console.log("UserID : " +  userid);
     console.log("inventory_id : " +  inventory_id);
     
     let requestBody: string = 
      "{\"userid\":\"" + userid +"\",\"username\":\"" + username +"\"" + ",\"inventory_id\":\"" + inventory_id + "\"" + 
      ",\"return_by_date\":\"" + returnByDate + "\",\"booking_date\":\"" + bookingDate + "\"}";   
    
      //this._reservationService.addReservation(requestBody);
           this._reservationService.addReservation(requestBody)
      .subscribe(newReservation => this.newReservation = newReservation);
      this.display=false;
      this.showInfo('info', 'Inventory Assigned Successfully', "Inventory ID: " + inventory_id + " is assigned to " + userid);          
    }    
        onBack(): void {
        this._router.navigate(['/adminbay']);
    }
    
     onEdit(inv_id, inv_name,inv_category,inv_vendorname,inv_vendorcontact,inv_cost,inv_purchasedate): void {
        this.editOrSaveMode='Save';
        let editMsg;

        if(this.disableField==false && this.editOrSaveMode=='Save'){
            console.log("In Save Mode");    
            if(inv_cost===null)
                inv_cost=0;
            /*
            console.log("%%%%%%inv_id %%%%%%%%%: " + inv_id.value);
            console.log("%%%%%%inventoryDetails?.name%%%%%%%%%: " + inv_name.value);
            console.log("%%%%%%inv_category %%%%%%%%%: " + inv_category.value);
            console.log("%%%%%%inv_vendorname %%%%%%%%%: " + inv_vendorname.value);
            console.log("%%%%%%inv_vendorcontact %%%%%%%%%: " + inv_vendorcontact.value);
            console.log("%%%%%%inv_cost %%%%%%%%%: " + inv_cost.value);
            console.log("%%%%%%inv_purchasedate %%%%%%%%%: " + inv_purchasedate.value);
            */

            //Save to call PUT operation
            let requestBody: string = 
            "{\"id\":\"" + inv_id.value +"\",\"name\":\"" +inv_name.value+ "\",\"category\":\""+inv_category.value +"\"" + 
            ",\"purchase_date\":\"" + inv_purchasedate.value + "\",\"vendor_name\":\"" + inv_vendorname.value
            + "\",\"vendor_contact\":\"" + inv_vendorcontact.value + "\",\"cost\":" + inv_cost.value 
            + ",\"@metadata\": {\"checksum\": \"override\"}"
            + "}";   
            console.log("%%%%%%Request bodyyyyyyy %%%%%%%%%: " + requestBody);
            this._inventoryService.updateExistingInventory(requestBody)
            .subscribe(editMsg => editMsg = editMsg);
            this.showInfo('info', 'Inventory update:', "Inventory ID: " + inv_id.value + "("+ inv_name.value +") is updated successfully");
        }
        
        else{
            this.disableField=false;          
            console.log("In Edit Mode");
        }     
    }//onEdit
    
} 