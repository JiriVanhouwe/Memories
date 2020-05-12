import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../memory.service';
import { Memory } from '../memory';
import { ActivatedRoute, Router } from '@angular/router';
import { Friend } from 'src/app/friends/friend';

@Component({
  selector: 'app-friend-add',
  templateUrl: './friend-add.component.html',
  styleUrls: ['./friend-add.component.css']
})
export class FriendAddComponent implements OnInit {
  public memory: Memory;
  public friends: string[]; //array met de emailadressen van vrienden die nog geen lid zijn van deze memory

  constructor(private _memoryService: MemoryService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this._route.data.subscribe(item => this.memory = item['memory']);
    this._route.data.subscribe(item => this.friends = item['any']);
  }


  addFriendToMemory(friend: string){
    this._memoryService.addFriendToMemory$(this.memory.id, friend).subscribe(data => this.goBack());  
  }

  goBack(){
    this._router.navigate([`/memories/${this.memory.id}`]);
  }
}
