import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../user/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor { 
  //voor je naar de backend gaat, gaat het via de interceptor. 
  //zo kan je de token mee geven bij elke request

  constructor(private _authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this._authenticationService.tokenStorage.length){ //is er een token? is de user aangemeld?
      const clonedRequest = request.clone({ //de huidige request clonen
        headers: request.headers.set("Authorization", `Bearer ${this._authenticationService.tokenStorage}`) //authorisatie toevoegen met token
      });

      return next.handle(clonedRequest);
    }
    return next.handle(request); //als er geen token is
  }
}
