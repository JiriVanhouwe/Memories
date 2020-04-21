import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../memories/memory.service';
import { Observable } from 'rxjs';
import { Friend } from './friend';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  public _userWithFriends: Friend;

  constructor(private _memoryService: MemoryService) {
    
   }

  ngOnInit(): void {
    console.log("ok")
    this._memoryService.getFriends$(1).subscribe(data => this._userWithFriends = data);
   
   console.log(this._userWithFriends.firstName)
  }

  get friends$(){
    return this._userWithFriends;
  }

}
