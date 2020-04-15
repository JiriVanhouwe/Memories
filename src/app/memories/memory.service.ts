import { Injectable } from '@angular/core';
import { IMemory, Memory } from './memory';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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