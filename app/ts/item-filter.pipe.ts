import {PipeTransform, Pipe} from 'angular2/core';
import {Item} from './inventory'

@Pipe({
    name: 'itemFilter'
})
export class ItemFilterPipe implements PipeTransform{
    
    transform(value: Item[], args:string[]):Item[]{
        let filter: string=args[0]?args[0].toLocaleLowerCase():null;
        return filter ? value.filter ((items: Item) =>
        items.name.toLocaleLowerCase().indexOf(filter)!=-1):value;   
             
    }
}