import { Memory } from './memory';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MemoryService } from './memory.service';

@Injectable({
    providedIn: 'root'
})
export class MemoryResolver implements Resolve<Memory>{//zodat bij het renderen van de pagina het pas getoond wordt als het object ingeladen werd.

    constructor(private memoryService: MemoryService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Memory> {
       return  this.memoryService.getMemory$(route.params['id']);
    }

}