import { ILocation } from './location';
import { Location } from './location';

export interface IMemory{
    memoryId: number;
    title: string;
    subTitle: string;
    startDate: string;
    endDate: string;
    imageUrl: string;
    location: ILocation;
}

export class Memory{
    private _memoryId: number;
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
        mem._memoryId = json.memoryId;
        return mem;
    }

    get title(){
        return this._title;
    }
    get subTitle(){
        return this._subTitle;
    }
    get startDate(){
        return this._startDate;
    }
    get endDate(){
        return this._endDate;
    }
    get imageUrl(){
        return this._imageUrl;
    }
    get location(){
        return this._location;
    }
}