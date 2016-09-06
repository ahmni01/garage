import {Component, OnInit}  from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute, Params,Router} from '@angular/router';
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
import {Message} from 'primeng/primeng';
import {Messages} from 'primeng/primeng';
import {InventoryService} from '../services/inventory.service';
import {ReservationService} from '../services/reservation.service'
import {Inventory}    from './inventory';

import { AuthService } from '../services/auth'
import { Auth } from '../containers/auth';

@Component({
    templateUrl: 'app/inventory/inventory-details.component.html',    
       directives: [Accordion, 
                    FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES,
                    AccordionTab, InputText, Panel, 
                    Calendar,Button, Dialog,Messages],
       providers: [InventoryService, 
                   ReservationService,
                   FormBuilder]    
})
export class InventoryDetailsComponent implements OnInit{
    pageTitle:string = 'Inventory details';
    inventoryDetails: Inventory; 
    newReservation:any;   
    errorMessage: string;
    display: boolean = false;
    disableField:boolean=true;
    disableAssignButton:boolean=false;
    editOrSaveMode = 'Edit';
    assignInventory:boolean = false;
    msgs: Message[] = [];
    submitted = false;
    reservationFormGroup: FormGroup;
    userId: FormControl;
    userName: FormControl;
    toReturnDate: FormControl;


    constructor(private _inventoryService: InventoryService, 
                private _reservationService: ReservationService,
                private _route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private _router: Router){
                    this.userId = new FormControl('', Validators.compose([Validators.required, Validators.minLength(7),
                    Validators.maxLength(7)]));
                    this.toReturnDate = new FormControl('', Validators.required),
                    this.userName = new FormControl('');
                    
    this.reservationFormGroup = this.formBuilder.group({
      'userid': this.userId,
      'userName':this.userName,
      'toReturnDate':this.toReturnDate
    });


    }

    ngOnInit(): void {
        this._route.params.forEach((params: Params) => {
        let id = +params['id'];
        this.pageTitle = this.pageTitle + ':';
        this.searchInventory(id);
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
            alert("Item is already checkout out by another Employee");
            this.disableAssignButton = true;
        }   
    }



clear() {
        this.msgs = [];
    }        
    
    searchInventory(id: number) {
       this._inventoryService.searchInventory(id)
            .subscribe(
            inventory => this.inventoryDetails = inventory,
            error => this.errorMessage = <any>error);          
            }
   
    assign(){
        this.submitted = true;
        let bookingDate="";
        let newDate = new Date();

        // Get the month, day, and year.
        bookingDate += (newDate.getMonth() + 1) + "/";
        bookingDate += newDate.getDate() + "/";
        bookingDate += newDate.getFullYear();
     
     let requestBodyForReservation: string = 
      "{\"userid\":\"" + this.userId.value +"\",\"username\":\"" + this.userName.value +"\"" + ",\"inventory_id\":\"" 
      + this.inventoryDetails.id + "\"" + 
      ",\"return_by_date\":\"" + this.toReturnDate.value  + "\",\"booking_date\":\"" + bookingDate + "\"}";   
    console.log("#################" + requestBodyForReservation);
      this._reservationService.addReservation(requestBodyForReservation)
      .subscribe(newReservation => this.newReservation = newReservation);

      //Save to call PUT operation
      let requestBodyForUpdatingInventory:string = 
            "{\"id\":\"" + this.inventoryDetails.id + "\",\"available\": \"no\""  + ",\"current_owner\": \""+ this.userId.value  + "\""
            + ",\"@metadata\": {\"checksum\": \"override\"}"
            + "}";   
            this._inventoryService.updateExistingInventory(requestBodyForUpdatingInventory)
            .subscribe(editMsg => editMsg = editMsg);

      this.display=false;
      this.showInfo('info', 'Inventory Assigned Successfully', "Inventory ID: " + this.inventoryDetails.id + " is assigned to " 
      + this.userId.value );
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
        //console.log("JSON.stringify(this.userform.value) - " + JSON.stringify(this.userform.value) )
    }//onSubmit
 
} 