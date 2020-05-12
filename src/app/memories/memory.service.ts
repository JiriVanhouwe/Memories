import { Injectable } from '@angular/core';
import { IMemory, Memory } from './memory';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Friend } from '../friends/friend';

@Injectable({
    providedIn: 'root'
})
export class MemoryService {

  private _reloadMemories$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient){

  }

  getMemories$(filter? : string){
    return this._reloadMemories$.pipe(
        switchMap(() => this.fetchMemories$(filter))
    );
  }

    //GET ALL MEMORIES
    fetchMemories$(filter? : string) : Observable<Memory[]>{
      let params = new HttpParams();
      params = filter ? params.append('filter', filter) : params;

      return this.http.get<Memory[]>(`${environment.apiUrl}/memories/`, {params})
        .pipe(tap(data => data.forEach(d => console.log(d.id + " " + d.title + " " + d.subTitle))), catchError(this.handleError));
    }

    //GET MEMORY BY ID
    getMemory$(id : string) : Observable<Memory>{
      const url = `${environment.apiUrl}/memories/${id}`;
      return this.http.get<Memory>(url).pipe(
        tap(data => console.log('getMemory: ' + JSON.stringify(data.id + " " + data.title + " " + data.subTitle))), catchError(this.handleError)
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
    }

    //POST PHOTO
    addPhoto$(photos: File, id: number){
     const fd = new FormData();
     fd.append('image', photos, photos.name)

     return this.http.post(`${environment.apiUrl}/memories/${id}`, fd);
    }

    //POGING MEERDERE AFBEELDINGEN IN EEN KEER
    // addPhoto$(photos: File[], id: number){
    //   const fd = new FormData();

    //   for(let i = 0; i < photos.length; i++){
    //       fd.append(`image${i}`, photos[i], photos[i].name)
    //   }
    //   console.log("Bezig met opslaan ");
 
    //   return this.http.post(`${environment.apiUrl}/memories/${id}`, fd)
    //   .subscribe(res => {
    //     console.log(res);
    //   });
    //  }

    //PUT MEMORY
    updateMemory$(memory: Memory): Observable<Memory>{
      console.log("Veranderd: " + JSON.stringify(memory.title + " " +memory.subTitle + " " + memory.location.country + " " + memory.location.city))
      
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      const url = `${environment.apiUrl}/memories/${memory.id}`;

      return this.http.put<Memory>(url, memory, {headers: headers}).pipe(
        tap(() => console.log('Update memory: ' + memory.id)),
        map(() => memory),
        catchError(this.handleError)
      );
    }

    //GET FRIENDS THAT ARE NOT CONNECTED TO MEMORY
    //TODO nog uitwerken
    getFriendsToAddToMemory(id: number){
      const url = `${environment.apiUrl}/memories/${id}/add`;
      return this.http.get<string[]>(url).pipe(
        tap(data => console.log(data)), catchError(this.handleError)
      )
    }

    //ADD FRIEND TO MEMORY
    addFriendToMemory$(id: number, email: string){
      const url = `${environment.apiUrl}/memories/${id}/add`;
      let param = new HttpParams().set("email", email);

      return this.http.put<string>(url, {}, {params:param})
      .pipe(tap(() => console.log('Vriend toegevoegd: ' + email + " memory id: " + id)),catchError(this.handleError));
    }

    //DELETE MEMORY
    deleteMemory(id: number){
      return this.http
      .delete(`${environment.apiUrl}/memories/${id}`)
      .pipe(tap(data => console.log(`Memory met id ${id} werd verwijderd.`)), catchError(this.handleError))
      .subscribe(() => {this._reloadMemories$.next(true);
      });
    }


    //friends page
    //GET ALL FRIENDS
    getFriends$(): Observable<Friend>{
      const url = `${environment.apiUrl}/friends/`;
      return this.http.get<Friend>(url).pipe(
        tap(data => console.log('Get friends: ' + JSON.stringify(data))), catchError(this.handleError)
      )
    }

    //INVITE NEW USER
    inviteNewUser(email: string): Observable<Object>{
      const url = `${environment.apiUrl}/friends/${email}`;
      let param = new HttpParams().set("email", email);

      return this.http.get(url, {params: param}).pipe(
        tap(data => console.log('Resultaat: ', data)), catchError(this.handleError)
      );
    }

    //DELETE A FRIEND
    deleteFriend(email: string): Observable<{}>{
      let param = new HttpParams().set("email", email);
      const url = `${environment.apiUrl}/friends/`;

      return this.http
      .delete(url, {params: param})
      .pipe(tap(data => console.log(`Vriend ${email} werd verwijderd.`)), catchError(this.handleError))
    }

    //ADD A FRIEND 
    addFriend(email: string): Observable<Object>{
      let param = new HttpParams().set("email", email);
      console.log("param " + param);
      const url = `${environment.apiUrl}/friends/`;

      return this.http
      .put<string>(url, {}, {params: param})
      .pipe(catchError(this.handleError))      
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