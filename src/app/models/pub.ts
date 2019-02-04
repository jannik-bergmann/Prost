export class Pub {
    
    id: string;
    name: string;
    marked: boolean;

    constructor(name: string, id: string){
        this.marked=false;
        this.name=name;
        this.id=id;
    }
}