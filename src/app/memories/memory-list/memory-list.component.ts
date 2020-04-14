import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IMemory } from '../memory';
import { MemoryService } from '../memory.service';

@Component({
  selector: 'app-memory-list',
  templateUrl: './memory-list.component.html',
  styleUrls: ['./memory-list.component.css']
})

export class MemoryListComponent implements OnInit {
  _listFilter : string;
  filteredMemories : IMemory[];
  memories: IMemory[];
  
  @Output() memoryClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor(private memoryService: MemoryService) { 
    
  }

  get listFilter(): string{
    return this._listFilter;
  }
  
  set listFilter(value : string){
    this._listFilter = value;
    this.filteredMemories = this.listFilter ? this.performFilter(this.listFilter) : this.memories;
  }

  performFilter(filterBy: string): IMemory[] { //filter op title of subtitle
    filterBy = filterBy.toLocaleLowerCase();
    return this.memories.filter((memory: IMemory) => memory.title.toLocaleLowerCase().indexOf(filterBy) !== -1 || memory.subTitle.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  clickMemory(memory: IMemory) : void{
      //toont alle foto's van een memory   
      console.log("Memory openen" + memory.memoryId);
  }

  ngOnInit(): void {  
    this.memories = this.memoryService.getMemories(); //memories vullen met data
    this.filteredMemories = this.memories;   //de gefilterde lijst vullen met alle memories
  }

}
