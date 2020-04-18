import { Component, OnInit } from '@angular/core';
import { Memory } from '../memory';
import { ActivatedRoute, Router } from '@angular/router';
import { MemoryService } from '../memory.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-memory-detail',
  templateUrl: './memory-detail.component.html',
  styleUrls: ['./memory-detail.component.css']
})
export class MemoryDetailComponent implements OnInit {

  public memory: Memory;

  constructor(private _route: ActivatedRoute, private _memoryService: MemoryService, private _location: Location, private _router : Router) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(pa => 
      this._memoryService.getMemory$(pa.get('id')).subscribe(item => (this.memory = item)));
      
  }

  goBack(): void{
     this._location.back();
  }


}
