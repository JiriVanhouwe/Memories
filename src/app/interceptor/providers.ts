import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './authentication.interceptor';

export const httpInterceptorProviders = [ //dit voeg je toe bij providers in de app.module
  {
    provide: HTTP_INTERCEPTORS, // type provider
    useClass: AuthenticationInterceptor, //voor welke klasse
    multi: true //kan meermaals gebruikt worden 
  }
];