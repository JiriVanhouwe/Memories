import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memory-list',
  templateUrl: './memory-list.component.html',
  styleUrls: ['./memory-list.component.css']
})
export class MemoryListComponent implements OnInit {
    title: string = "Reis Kaapverdië";
    subTitle: string = "Kuieren op de met zon overgoten witte stranden.";
    memories: any[] =[
      {
        "memoryId" : 1,
        "title": "Reis kaapverdië",
        "subTitle": "Kuieren op de met zon overgoten witte stranden.",
        "image": "assets/Sun.jpg"
      },
      {
        "memoryId" : 2,
        "title": "Wandeling Etretat",
       "subTitle": "Eindeloos verdwalen het groen van Etretat.",
       "image": "assets/Forest.jpg"

      }
    ];

  constructor() { 
    
  }

  clickMemory() : void{
      //toont alle foto's van een memory
  }

  ngOnInit(): void {
  }

}
