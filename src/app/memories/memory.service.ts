import { Injectable } from '@angular/core';
import { IMemory, Memory } from './memory';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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


    //GET ALL
    getMemories$() : Observable<Memory[]>{
      return this.http.get<Memory[]>(`${environment.apiUrl}/memories/`)
        .pipe(tap(data => console.log('All: ' + JSON.stringify(data))), catchError(this.handleError));
    }

    //GET BY ID
    getMemory$(id : string) : Observable<Memory>{
      const url = `${environment.apiUrl}/memories/${id}`;
      return this.http.get<Memory>(url).pipe(
        tap(data => console.log('getMemory: ' + JSON.stringify(data))), catchError(this.handleError)
      )
    }

    //POST MEMORY
    postMemory$(memory: Memory){
      console.log("kom ik hier");
      return this.http.post(`${environment.apiUrl}/memories/`, memory.toJSON()).pipe(
        tap(data => console.log('Post new memory: ' +JSON.stringify(memory))),
        catchError(this.handleError),
        map(Memory.fromJSON)
      )
     
      // const headers = new HttpHeaders({'Content-Type': 'application/json'});

      // console.log("of hier");
      // return this.http.post<Memory>(`${environment.apiUrl}/memories`, memory, {headers: headers}).pipe(
      //   tap(data => console.log('Post new memory: ' + JSON.stringify(memory))), 
      //   catchError(this.handleError), 
      // );
      
    }

    //PUT MEMORY
    updateMemory$(memory: Memory): Observable<Memory>{
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      const url = `${environment.apiUrl}/memories/${memory.memoryId}`;

      return this.http.put<Memory>(url, memory, {headers: headers}).pipe(
        tap(() => console.log('Update memory: ' + memory.memoryId)),
        map(() => memory),
        catchError(this.handleError)
      );
    }

    //DELETE MEMORY
    deleteMemory(id: number) : Observable<{}>{
      return this.http
      .delete(`${environment.apiUrl}/memories/${id}`)
      .pipe(tap(data => console.log(`Memory met id ${id} werd verwijderd.`)), catchError(this.handleError))
    }

    handleError(err: any): Observable<never> {
      let errorMessage: string;
      if (err.error instanceof ErrorEvent) {
        errorMessage = `Er liep iets fout: ${err.error.message}`;
      } else if (err instanceof HttpErrorResponse) {
        console.log(err);
        errorMessage = `'${err.status} ${err.statusText}' bij het gebruiken van '${err.url}'`;
      } else {
        errorMessage = err;
      }
      return throwError(errorMessage);
    }
}