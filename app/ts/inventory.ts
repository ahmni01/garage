export class Item{
    constructor(
    public id: number,
    public name: string,
    public manufacturer: string,
    public category: string,
    public available?:boolean,
    public availableSince?:string,
    public contact?:string,
    public cost?:string,
    public count?: number,
    public availableCount?: number        
  ) {  }
}


