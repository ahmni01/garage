import {Component, OnInit}  from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Panel} from 'primeng/primeng';
import {DataTable} from 'primeng/primeng';
import {Column} from 'primeng/primeng';


import {Inventory}    from '../inventory/inventory';
import {InventoryService} from '../services/inventory.service';
import {ReservationService} from '../services/reservation.service'
import {Observable} from 'rxjs/Observable'; 
import {Subject}  from 'rxjs/Subject';

@Component({
    templateUrl: 'app/adminbay/adminbay.component.html',
    directives: [ROUTER_DIRECTIVES,Panel,DataTable,Column],
  providers:[InventoryService,ReservationService]

}) 
export class AdminBayComponent implements OnInit{
 constructor(private _inventoryService:InventoryService,
             private _reservationService:ReservationService ){        
    }
   private pageTitle:string = 'Search & Allocate';
   private searchTermStream = new Subject<string>();
   reservation:any;
   cols: any[];

ngOnInit():void{
this._reservationService.getAllReservationInfo()
      .subscribe(reservation => this.reservation = reservation);
}
 search(term: string) { 
    if (!term) { return; };
    this.searchTermStream.next(term); 
  }

 inventoryData: Observable<Inventory[]> = this.searchTermStream
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap((term: string) => this._inventoryService.findInventory(term)); 
    

    
} 