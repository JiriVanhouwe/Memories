import { Component, OnInit } from '@angular/core';
import { IMemory } from '../memory';

@Component({
  selector: 'app-memory-list',
  templateUrl: './memory-list.component.html',
  styleUrls: ['./memory-list.component.css']
})
export class MemoryListComponent implements OnInit {

  _listFilter : string;
  filteredMemories : IMemory[];

    memories: IMemory[] =[
      {
        "memoryId" : 1,
        "title": "Reis kaapverdië",
        "subTitle": "Kuieren op de met zon overgoten witte stranden.",
        "startDate": '2020-03-11T18:25:43.511Z',
        "endDate": '2020-03-11T18:25:43.511Z',
        "imageUrl": "assets/Sun.jpg",
        "location": {
          "country": "Kaapverdië",
          "city": "Sal Rei"
        }
        
      },
      {
        "memoryId" : 2,
        "title": "Wandeling Etretat",
       "subTitle": "Eindeloos verdwalen het groen van Etretat.",
       "startDate": '2020-01-07T18:25:43.511Z',
        "endDate": '2020-01-10T18:25:43.511Z',
       "imageUrl": "assets/Forest.jpg",
       "location": {
        "country": "Frankrijk",
        "city": "Etretat"
      }
      }
    ];

  constructor() { 
    this.filteredMemories = this.memories;
    this.listFilter = "";
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

  clickMemory() : void{
      //toont alle foto's van een memory
  }

  ngOnInit(): void {
    console.log("init methode");
  }

}
