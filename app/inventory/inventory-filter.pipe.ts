import {PipeTransform, Pipe} from '@angular/core';
import {Inventory} from './inventory'

@Pipe({
    name: 'itemFilter'
})
export class InventoryFilterPipe implements PipeTransform{
    
    transform(value: Inventory[], args:string[]):Inventory[]{
        let filter: string=args[0]?args[0].toLocaleLowerCase():null;
        return filter ? value.filter ((items: Inventory) =>
        items.name.toLocaleLowerCase().indexOf(filter)!=-1):value;   
              
    }
}