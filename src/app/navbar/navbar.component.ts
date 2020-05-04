import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  loggedInUser$ = this._authenticationService.user$; //de ingelogde user.

  constructor(
    private _authenticationService: AuthenticationService, 
    private _router: Router) { }


    logout(){
      this._authenticationService.logout();
    }

    login(){
      this._router.navigate(['/login']);
    }

    register(){
      this._router.navigate(['/register']);
    }

}
