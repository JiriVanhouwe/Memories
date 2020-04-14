import { Component, OnInit } from '@angular/core';
import { IMemory } from '../memory';

@Component({
  selector: 'app-memory-list',
  templateUrl: './memory-list.component.html',
  styleUrls: ['./memory-list.component.css']
})
export class MemoryListComponent implements OnInit {

    memories: IMemory[] =[
      {
        "memoryId" : 1,
        "title": "Reis kaapverdië",
        "subTitle": "Kuieren op de met zon overgoten witte stranden.",
        "startDate": '2020-03-11T18:25:43.511Z',
        "endDate": '2020-03-11T18:25:43.511Z',
        "imageUrl": "assets/Sun.jpg"
      },
      {
        "memoryId" : 2,
        "title": "Wandeling Etretat",
       "subTitle": "Eindeloos verdwalen het groen van Etretat.",
       "startDate": '2020-01-07T18:25:43.511Z',
        "endDate": '2020-01-10T18:25:43.511Z',
       "imageUrl": "assets/Forest.jpg"
      }
    ];

  constructor() { 
    
  }

  clickMemory() : void{
      //toont alle foto's van een memory
  }

  ngOnInit(): void {
    console.log("init methode");
  }

}
