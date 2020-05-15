import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if(this.authService.user$.getValue()){ //is er een gebruiker aangemeld
        return true;
      }
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/login']); //geen gebruiker aangemeld, dan vlieg je naar de login
    return false;
  }
  
}
