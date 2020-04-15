export interface ILocation{
    locationId: number;
    country: string;
    city: string;
}

export class Location{
    private _locationId: number;
    

    constructor(private _country: string, private _city: string){

    }

    static fromJSON(json: ILocation): Location{
        const loc = new Location(json.country, json.country);
        loc._locationId = json.locationId;
        return loc;
    }

    set country(value: string){
        this._country = value;
    }
    set city(value: string){
        this._city = value;
    }

    get country(){
        return this._country;
    }

    get city(){
        return this._city;
    }
}