import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../../memories/memory.service';
import { Friend } from '../friend';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
   public userWithFriends: Observable<Friend>;
   public _emailInput: string;
   public message: string = ''; 
   public errorMessage: string = '';


  constructor(private _memoryService: MemoryService,private _route: ActivatedRoute, private _router: Router) {
    this.userWithFriends = this._memoryService.getFriends$();
   }

  ngOnInit(): void {

  }

  deleteFriend(email:string): void{
    if(confirm(`Ben je zeker dat je  ${email} wil verwijderen?`)){
      this._memoryService.deleteFriend(email);
      
  }
}

  addFriend():void{
    if(this._emailInput != null){
      this._memoryService.addFriend(this._emailInput);
    } 
  } 

  inviteFriend(): void{
    if(this._emailInput != null){
      this._memoryService.inviteNewUser(this._emailInput)
      .subscribe(data => {this.message = data.toLocaleString()});
    }   
}


  get friends$(){
    return this.userWithFriends;
  }

  set emailInput(value:string){
    this._emailInput = value;
  }

}
