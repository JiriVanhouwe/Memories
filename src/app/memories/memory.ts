import { ILocation } from './location';

export interface IMemory{
    memoryId: number;
    title: string;
    subTitle: string;
    startDate: string;
    endDate: string;
    imageUrl: string;
    location: ILocation;
}