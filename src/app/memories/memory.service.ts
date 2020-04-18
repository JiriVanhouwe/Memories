import { Injectable } from '@angular/core';
import { IMemory, Memory } from './memory';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MemoryService {
  private _memories : Memory[];
  private _memories$ = new BehaviorSubject<Memory[]>([]);

  constructor(private http: HttpClient){
      this.getMemories$().subscribe(rec => this._memories = rec);
      this._memories$.next(this._memories);
  }

    getMemories$() : Observable<Memory[]>{
      return this.http.get<Memory[]>(`${environment.apiUrl}/memories/`)
        .pipe(tap(data => console.log('All: ' + JSON.stringify(data))), catchError(this.handleError));
    }

    getMemory$(id : string) : Observable<Memory>{
      const url = `${environment.apiUrl}/memories/${id}`;
      return this.http.get<Memory>(url).pipe(
        tap(data => console.log('getMemory: ' + JSON.stringify(data))), catchError(this.handleError)
      )

      // return this.http.get(`${environment.apiUrl}/memories/${id}`).pipe(catchError(this.handleError)
      // , map(Memory.fromJSON));
    }

    private handleError(error : HttpErrorResponse){
      let errorMessage = '';
      if(error.error instanceof ErrorEvent){
        errorMessage = `Er liep iets fout: ${error.error.message}`;
      } else {
        errorMessage = `De server gaf deze code terug: ${error.status}, error message is: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
}