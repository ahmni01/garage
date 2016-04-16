import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import { Item }    from './inventory';
import {ItemFilterPipe} from './item-filter.pipe';

@Component({
  selector: 'inventory-form',
  templateUrl: 'app/html/inventory-form.component.html',
  pipes: [ItemFilterPipe]
})
export class ItemFormComponent {
  listFilter: string = '';  
  category = ['Lego', 'Drone','Book', 'AI-KIT'];

  model = new Item(1, '', 'BostonDynamics', 'Books',true );  
  
 items:Item[] = [
 {id:1,name:'Lego',availableSince:'0216',count:100,contact:'Prabhjoth',cost:'Free', manufacturer:'LEGO.COM',category:'Lego',available:false, availableCount:0},
 {id:2,name:'Mini-Drone',availableSince:'0216',count:5,contact:'Prabhjoth',cost:'100$ - Charge Back to BU', manufacturer:'Syma',category:'Drone',available:true,availableCount:3},
 {id:3,name:'Raspberry PI v1',availableSince:'0216',count:10,contact:'Shawali',cost:'10$ - Charge Back to BU', manufacturer:'RASPBERRY PI FOUNDATION',category:'Rasperry',available:true,availableCount:5},
 {id:4,name:'Raspberry PI v2',availableSince:'0216',count:20,contact:'Shawali',cost:'10$ - Charge Back to BU', manufacturer:'RASPBERRY PI FOUNDATION',category:'Rasperry',available:true,availableCount:5},
 {id:5,name:'Raspberry PI v3',availableSince:'0216',count:50,contact:'Shawali',cost:'10$ - Charge Back to BU', manufacturer:'RASPBERRY PI FOUNDATION',category:'Rasperry',available:true,availableCount:10}, 
 {id:6,name:'AI-Kit 1.0',availableSince:'0216',count:10,contact:'Shawali',cost:'10$ - Charge Back to BU',manufacturer:'AI-Kit Vendor',category:'AI-Kit', available:false,availableCount:0}               
 ];
 
  submitted = false;

  onSubmit() { this.submitted = true; 
      //console.log(      JSON.stringify(this.model));
      this.items.push(this.model);
      
      }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  // Reset the form with a new object AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;

  newHero() {
    this.model = new Item(42, 'vvvvv', '','bbbbbb');
    this.active = false;
    setTimeout(()=> this.active=true, 0);
  }
  //////// NOT SHOWN IN DOCS ////////

  showFormControls(form:NgForm){

    return form && form.controls['name'] &&
    form.controls['name'].value; // Dr. IQ
  }

  /////////////////////////////

}



