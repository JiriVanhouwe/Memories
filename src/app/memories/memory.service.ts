import { Injectable } from '@angular/core';
import { IMemory } from './memory';

@Injectable({
    providedIn: 'root'
})
export class MemoryService {

    getMemories() : IMemory[]{
        return [
            {
              "memoryId" : 1,
              "title": "Reis kaapverdië",
              "subTitle": "Kuieren op de met zon overgoten witte stranden.",
              "startDate": '2020-03-11T18:25:43.511Z',
              "endDate": '2020-03-11T18:25:43.511Z',
              "imageUrl": "assets/Sun.jpg",
              "location": {
                "country": "Kaapverdië",
                "city": "Sal Rei"
              }
              
            },
            {
              "memoryId" : 2,
              "title": "Wandeling Etretat",
             "subTitle": "Eindeloos verdwalen het groen van Etretat.",
             "startDate": '2020-01-07T18:25:43.511Z',
              "endDate": '2020-01-10T18:25:43.511Z',
             "imageUrl": "assets/Forest.jpg",
             "location": {
              "country": "Frankrijk",
              "city": "Etretat"
            }
        },

            {
                "memoryId" : 3,
                "title": "Diner in Amigo Amigo",
               "subTitle": "Culinair genieten in Gent!",
               "startDate": '2020-02-20T18:25:43.511Z',
                "endDate": '2020-02-20T18:25:43.511Z',
               "imageUrl": "assets/Amigo.jpg",
               "location": {
                "country": "België",
                "city": "Gent"
              }
              }
          ];
    }
}