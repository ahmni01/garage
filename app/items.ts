export interface ItemInterface{ 
     id: number;
     name: string;
     vendor_name: string;
     category: string;
     availableSince:string;
     contact:string;
     cost:number;
   
}


export class Item implements ItemInterface{
    constructor(
    public id: number,
    public name: string,
    public category: string,
    public vendor_name: string,
    public contact?:string,
    public cost?:number,
    public availableSince?:string
  ) {  }
}


