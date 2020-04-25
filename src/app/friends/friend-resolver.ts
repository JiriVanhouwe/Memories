import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MemoryService } from '../memories/memory.service';
import { Friend } from './friend';

@Injectable({
    providedIn: 'root'
})
export class FriendResolver implements Resolve<Friend>{//zodat bij het renderen van de pagina het pas getoond wordt als het object ingeladen werd.

    constructor(private memoryService: MemoryService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Friend> {
       return  this.memoryService.getFriends$(route.params['id']);
    }

}