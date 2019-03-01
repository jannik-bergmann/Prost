export class Pub {
    
    id: string;
    name: string;
    latitude: any;
    longitude: any;
    marked: boolean;

    constructor(name: string, id: string, latitude: any, longitude: any){
        this.name=name;
        this.id=id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.marked=false;
    }
    
}