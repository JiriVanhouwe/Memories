import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IMemory, Memory } from '../memory';
import { MemoryService } from '../memory.service';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memory-list',
  templateUrl: './memory-list.component.html',
  styleUrls: ['./memory-list.component.css']
})

export class MemoryListComponent implements OnInit {
  private _listFilter : string;
  public filterMemories$ = new Subject<string>();
  private _memories$: Observable<Memory[]>;
  
  @Output() memoryClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor(private memoryService: MemoryService, private _router : Router) { 
    this.filterMemories$.pipe(
      distinctUntilChanged(),
      debounceTime(400),
      map(val => val.toLowerCase())
    )
    .subscribe(val => (this.listFilter = val));
  }

  get memories$(){
    return this._memories$;
  }

  get listFilter(): string{
    return this._listFilter;
  }
  
  set listFilter(value : string){
    this._listFilter = value;
    }

  clickMemory(memory: IMemory) : void{
      //toont alle foto's van een memory   
      console.log("Memory openen" + memory.memoryId);
  }

  clickAddMemory():void{
    this._router.navigate(['memories/add']);
  }

  ngOnInit(): void {  
    this._memories$ = this.memoryService.getMemories$();    
  }

}
