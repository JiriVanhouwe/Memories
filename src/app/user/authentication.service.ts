import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


function parseJwt(token){
  if(!token){
    return null;
  }
  const base64Token = token.split('.')[1]; //we krijgen een array van drie delen: header, payload, signature
  const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly _tokenKey = 'currentUser';
  private _user$: BehaviorSubject<string>;
  public redirectUrl = '';

  constructor(private http: HttpClient) {
    let parsedToken = parseJwt(this.tokenStorage); //token ophalen
    if(parsedToken){
      const expires = new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date(); //datum met expire date die we krijgen van backend
      if(expires){
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }

    this._user$= new BehaviorSubject<string>(parsedToken && parsedToken.unique_name); //hier zit de ingelogde gebruiker in
   }

  set tokenStorage(token){
    localStorage.setItem(this._tokenKey, token);   //zo blijf je aangemeld + deze token gaan we nog nodig hebben om data op te vragen
  }

  get tokenStorage(){
    const localToken = localStorage.getItem(this._tokenKey);
    return localToken ? localToken : ''; 
  }

  get user$(): BehaviorSubject<string>{
    return this._user$;
  }

  login(email: string, password: string): Observable<boolean>{
      return this.http.post(`${environment.apiUrl}/account`, {email, password},
      {responseType: 'text'}).pipe(     //token verwachten we terug in een textfield
        map((token: any) => {
          if(token){
            this.tokenStorage = token;  //token slaan we op in de localstorage
            this._user$.next(email);
            return true;                //true als het aanmelden lukt
          }else {
            return false;
          }
        })
      );
  }

  register(firstName: string, lastName: string, email: string, password: string):Observable<boolean>{
    return this.http.post(`${environment.apiUrl}/account/register`,
      {firstName,lastName,email,password,passwordConfirmation: password,},
      { responseType: "text" } //we krijgen hier de jwt token als text binnen
    )
    .pipe(
      map((token: any) => {
        if (token) {
          this.tokenStorage = token;
          this._user$.next(email);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout(): void{
    if(this.user$.getValue()){
      localStorage.removeItem(this._tokenKey);
      this._user$.next(null);     //er is niemand meer aangemeld
    }
  }

  checkUserNameAvailability = (email: string) : Observable<boolean> =>
  {
    return this.http.get<boolean>(`${environment.apiUrl}/account/checkusername`,{params: {email},}
    );
  };
}


