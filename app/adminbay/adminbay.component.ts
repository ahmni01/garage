import {Component, OnInit}  from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Panel} from 'primeng/primeng';
import {DataTable} from 'primeng/primeng';
import {Column} from 'primeng/primeng';
import {Button} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import {Messages} from 'primeng/primeng';
import {Dialog} from 'primeng/primeng';
import {Toolbar} from 'primeng/primeng';

import {Inventory}    from '../inventory/inventory';
import {InventoryService} from '../services/inventory.service';
import {ReservationService} from '../services/reservation.service'
import {Observable} from 'rxjs/Observable'; 
import {Subject}  from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { AuthService } from '../services/auth'

@Component({
    templateUrl: 'app/adminbay/adminbay.component.html',
    directives: [Panel,DataTable,
                 Column,Button,Dialog,Toolbar,Messages],
  providers:[InventoryService,ReservationService]

}) 
export class AdminBayComponent implements OnInit{
 constructor(private _inventoryService:InventoryService,
             private _reservationService:ReservationService,
             private _authService:AuthService ){     
                    if(this._authService.isAuthorized()){
              this.loggedin=true;
            }   
    }

   private pageTitle:string = 'Search & Allocate';
   reservationRow:any;
   private searchTermStream = new Subject<string>();
   reservation:any;
   cols: any[];
   msgs: Message[] = [];
   displayReturnInvDialog:boolean = false;
   private loggedin:boolean;

ngOnInit():void{
this._reservationService.getAllReservationInfo()
      .subscribe(reservation => this.reservation = reservation);
}
showInfo(messageType:string, basicMessage:string, detailedMessage:string) {
        this.msgs = [];
        this.msgs.push({severity: messageType, summary:basicMessage, detail:detailedMessage});
    }

showReturnInvWarningDialog(reservationRow:any){
      this.reservationRow = reservationRow;
      this.displayReturnInvDialog = true;
}    

confirmInvReturn(){
      this.returnInventory(this.reservationRow);
}

returnInventory(reservationRow:any):void{
        let reservationReturnDate="";
        let newDate = new Date();

        // Get the month, day, and year.
        reservationReturnDate += (newDate.getMonth() + 1) + "/";
        reservationReturnDate += newDate.getDate() + "/";
        reservationReturnDate += newDate.getFullYear();

     //Save to call PUT operation
      let payloadForReturningReservation:string =    "{\"reservation_id\":" + reservationRow.reservation_id + ",\"returned_date\": \"" + reservationReturnDate + "\""  
            + ",\"@metadata\": {\"checksum\": \"override\"}"
            + "}";   
            this._reservationService.updateReservation(payloadForReturningReservation)
            .subscribe(editMsg => editMsg = editMsg);

      //Save to call PUT operation
      let requestBodyForUpdatingInventory:string = 
            "{\"id\":\"" + reservationRow.inventory_id + "\",\"available\": \"yes\"" + ",\"current_owner\": \"none\""  
            + ",\"@metadata\": {\"checksum\": \"override\"}"
            + "}"; 
            this._inventoryService.updateExistingInventory(requestBodyForUpdatingInventory)
            .subscribe(editMsg => editMsg = editMsg);            
      
      this.showInfo('info', 'Inventory Returned Successfully', "Inventory ID: " + reservationRow.reservation_id + " is now available for checkout");
      this._reservationService.getAllReservationInfo()
      .subscribe(reservation => this.reservation = reservation);

}

 search(term: string) { 
    if (!term) { return; };
    this.searchTermStream.next(term); 
  }

  logOff(){
        this.loggedin=false;
        this._authService.signout();
      }

 refreshReservation(){
       this._reservationService.getAllReservationInfo()
      .subscribe(reservation => this.reservation = reservation);
 } 

 inventoryData: Observable<Inventory[]> = this.searchTermStream
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap((term: string) => this._inventoryService.findInventory(term)); 
    

    
} 