import { ILocation } from './location';
import { LocationMemory } from './location';

export interface IMemory{
    id: number;
    title: string;
    subTitle: string;
    startDate: string;
    endDate: string;
    imageUrl: string;
    location: ILocation;
    photos: [];
    friends: string[];
}

export class Memory{
    private _id: number;
    private _location: LocationMemory;
    private _imageUrl: string;  //foto voor thumbnail
    private _photos: [];
    private _friends

    constructor(
        private _title: string, 
        private _subTitle: string, 
        private _startDate = new Date(), 
        private _endDate = new Date(),
        location: LocationMemory){
           this._location = location;

    }

    static fromJSON(json : IMemory): Memory{
        const mem = new Memory(
            json.title, json.subTitle, new Date(json.startDate), new Date(json.endDate), LocationMemory.fromJSON(json.location)
        );
        mem._id = json.id;
        return mem;
    }

    static fromJSONwithFriends(json: IMemory): Memory{
        const mem = new Memory(
            json.title, json.subTitle, new Date(json.startDate), new Date(json.endDate), LocationMemory.fromJSON(json.location)
        );
        mem._friends = json.friends;
        mem._id = json.id;
        return mem;
    }

 
    toJSON(): IMemory{
        return <IMemory>{
            title: this.title,
            subTitle: this.subTitle,
            startDate: this.startDate.toString(),
            endDate: this.endDate.toString(),
            location: this.location.toJSON()
        }
    }

    set imageUrl(value: string){
        this._imageUrl = value;
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
    get startDateAsString(): string{
        return this._startDate.toISOString();
    }
    get endDateAsString(): string{
        return this._endDate.toISOString();
    }
    get endDate(): Date{
        return this._endDate;
    }
    get imageUrl(): string{
        return this._imageUrl;
    }
    get location(): LocationMemory{
        return this._location;
    }
    get memoryId() : number{
        return this._id;
    }
    get photos(): string[]{
        return this._photos;
    }
    get friends(): string[]{
        return this._friends;
    }
}
