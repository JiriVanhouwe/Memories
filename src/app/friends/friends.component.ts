import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../memories/memory.service';
import { Observable } from 'rxjs';
import { Friend } from './friend';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  public _userWithFriends: Friend;

  constructor(private _memoryService: MemoryService,private _route: ActivatedRoute) {
    
   }

  ngOnInit(): void {
    this._route.data.subscribe(item => this._userWithFriends = item['friend']); //via de resolver wordt eerst de memory geladen en dan getoond.
    console.log(`${this._userWithFriends.firstName} en zijn vrienden.`);}

  deleteFriend(email:string): void{
    if(confirm(`Ben je zeker dat je  ${email} wil verwijderen?`)){
  }
}

  get friends$(){
    return this._userWithFriends;
  }

}
