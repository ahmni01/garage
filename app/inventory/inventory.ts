export interface InventoryInterface{ 
     id: number;
     name: string;
     category: string;
     vendor_name: string;
     vendor_contact:string;
     cost:number;
     purchase_date:string;
}


export class Inventory implements InventoryInterface{
    constructor(
    public id: number,
    public name: string,
    public category: string,
    public vendor_name: string,    
    public vendor_contact?:string,
    public cost?:number,
    public purchase_date?:string     
  ) {  }
} 
