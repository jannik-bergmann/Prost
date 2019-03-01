import { Pub } from "./pub";

export class Route {

    id: number;
    name: string;
    geoJSON: any;
    pubs: Pub[];
    selectedPubs: Pub[];
    latitude: number;
    longitude: number;

    constructor(name: string){
        this.name=name;
        this.pubs = [];
        this.selectedPubs = [];
    }
}