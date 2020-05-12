import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MemoryService } from './memory.service';

@Injectable({
    providedIn: 'root'
})
export class AddFriendMemoryResolver implements Resolve<string[]>{//zodat bij het renderen van de pagina het pas getoond wordt als het object ingeladen werd.

    constructor(private memoryService: MemoryService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> {
       return  this.memoryService.getFriendsToAddToMemory(route.params['id']);
    }

}