import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../memory.service';
import { Memory } from '../memory';
import { ActivatedRoute } from '@angular/router';
import { Friend } from 'src/app/friends/friend';

@Component({
  selector: 'app-friend-add',
  templateUrl: './friend-add.component.html',
  styleUrls: ['./friend-add.component.css']
})
export class FriendAddComponent implements OnInit {
  public _userWithFriends: Friend;
  public memory: Memory;
  message: string = "";

  constructor(private _memoryService: MemoryService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.data.subscribe(item => this.memory = item['memory']);
    this._route.data.subscribe(item => this._userWithFriends = item['friend']);
  }


  addFriendToMemory(friend: Friend){
    console.log(friend.email);
    console.log("mem" + this.memory.subTitle);
   
    //todo omzetten naar een memory ipv opject.
    // this.memory.addFriend(friend);
    this._memoryService.updateMemory$(this.memory).subscribe({
      next: () => this.message = `${friend.email} werd toegevoegd`,
      error: err => this.getErrorMessage(err)
  });
  }

  getErrorMessage(errors: any): string {
    if (!errors) {
      return null;
    } else{
      return errors;
    }
  }

}
