import {PipeTransform, Pipe} from '@angular/core';
import {Inventory} from './inventory'
import {Observable} from 'rxjs/Observable'; 

@Pipe({
    name: 'itemFilter'
})
export class InventoryFilterPipe implements PipeTransform{
    
    transform(value: Inventory[], filter: string):Inventory[]{
        filter = filter ? filter.toLocaleLowerCase() : null; 
        console.log('$$$$$$$$$$filter$$$$$$$$$: ' + filter);
        return filter ? value.filter ((inventory) => 
        inventory.name.toLocaleLowerCase().indexOf(filter) !== -1) : value;  
       
              
    }
    
     
    
    
    
    
    

}



