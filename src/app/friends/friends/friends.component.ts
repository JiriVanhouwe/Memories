import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../../memories/memory.service';
import { Friend } from '../friend';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  public _userWithFriends: Friend;
   _emailInput: string; 

  constructor(private _memoryService: MemoryService,private _route: ActivatedRoute) {
    
   }

  ngOnInit(): void {
    this._route.data.subscribe(item => this._userWithFriends = item['friend']); //via de resolver wordt eerst de memory geladen en dan getoond.
    console.log(`${this._userWithFriends.firstName} en zijn vrienden.`);}

  deleteFriend(email:string): void{
    if(confirm(`Ben je zeker dat je  ${email} wil verwijderen?`)){
  }
}

  inviteFriend(): void{
    if(this._emailInput != null){
      this._memoryService.inviteNewUser(this._emailInput).subscribe(data => console.log(data));
    }
    
}

  get friends$(){
    return this._userWithFriends;
  }

  set emailInput(value:string){
    this._emailInput = value;
  }

}
