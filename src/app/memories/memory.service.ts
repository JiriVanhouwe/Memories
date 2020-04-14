import { Injectable } from '@angular/core';
import { IMemory } from './memory';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MemoryService {
  private url = 'api/memories';

  constructor(private http: HttpClient){

  }

    getMemories() : Observable<IMemory[]>{
      return this.http.get<IMemory[]>(this.url).pipe(tap(data => console.log('All: ' + JSON.stringify(data))), catchError(this.handleError));

        // return [
        //     {
        //       "memoryId" : 1,
        //       "title": "Reis kaapverdië",
        //       "subTitle": "Kuieren op de met zon overgoten witte stranden.",
        //       "startDate": '2020-03-11T18:25:43.511Z',
        //       "endDate": '2020-03-11T18:25:43.511Z',
        //       "imageUrl": "assets/Sun.jpg",
        //       "location": {
        //         "country": "Kaapverdië",
        //         "city": "Sal Rei"
        //       }
              
        //     },
        //     {
        //       "memoryId" : 2,
        //       "title": "Wandeling Etretat",
        //      "subTitle": "Eindeloos verdwalen het groen van Etretat.",
        //      "startDate": '2020-01-07T18:25:43.511Z',
        //       "endDate": '2020-01-10T18:25:43.511Z',
        //      "imageUrl": "assets/Forest.jpg",
        //      "location": {
        //       "country": "Frankrijk",
        //       "city": "Etretat"
        //     }
        // },

        //     {
        //         "memoryId" : 3,
        //         "title": "Diner in Amigo Amigo",
        //        "subTitle": "Culinair genieten in Gent!",
        //        "startDate": '2020-02-20T18:25:43.511Z',
        //         "endDate": '2020-02-20T18:25:43.511Z',
        //        "imageUrl": "assets/Amigo.jpg",
        //        "location": {
        //         "country": "België",
        //         "city": "Gent"
        //       }
        //       }
        //   ];
    }

    private handleError(error : HttpErrorResponse){
      let errorMessage = '';
      if(error.error instanceof ErrorEvent){
        errorMessage = `Er liep iets fout: ${error.error.message}`;
      } else {
        errorMessage = `De server gaf de code terug: ${error.status}, error message is: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
}