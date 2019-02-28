export class Pub {
    
    id: string;
    name: string;
    marked: boolean;
    latitude: any;
    longitude: any;

    constructor(name: string, id: string, latitude: any, longitude: any){
        this.marked=false;
        this.name=name;
        this.id=id;
        this.latitude = latitude;
        this.longitude = longitude;
    }
    
}