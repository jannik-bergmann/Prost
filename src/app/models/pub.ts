export class Pub {
    
    id: number;
    name: string;
    marked: boolean;

    constructor(name: string, id: number){
        this.marked=false;
        this.name=name;
        this.id=id;
    }
}