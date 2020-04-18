import { ILocation } from './location';
import { Location } from './location';

export interface IMemory{
    id: number;
    title: string;
    subTitle: string;
    startDate: string;
    endDate: string;
    imageUrl: string;
    location: ILocation;
}

export class Memory{
    private _id: number;
    private _location: Location;

    constructor(
        private _title: string, 
        private _subTitle: string, 
        private _startDate = new Date(), 
        private _endDate = new Date(),
        private _imageUrl: string,
        location: Location){
           this._location = location;
    }

    static fromJSON(json : IMemory): Memory{
        const mem = new Memory(
            json.title, json.subTitle, new Date(json.startDate), new Date(json.endDate), json.imageUrl, Location.fromJSON(json.location)
        );
        mem._id = json.id;
        return mem;
    }

    get title(): string{
        return this._title;
    }
    get subTitle(): string{
        return this._subTitle;
    }
    get startDate(): Date{
        return this._startDate;
    }
    get endDate(): Date{
        return this._endDate;
    }
    get imageUrl(): string{
        return this._imageUrl;
    }
    get location(): Location{
        return this._location;
    }
    get memoryId() : number{
        return this._id;
    }
}