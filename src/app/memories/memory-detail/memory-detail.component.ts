import { Component, OnInit } from '@angular/core';
import { Memory } from '../memory';
import { ActivatedRoute, Router } from '@angular/router';
import { MemoryService } from '../memory.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-memory-detail',
  templateUrl: './memory-detail.component.html',
  styleUrls: ['./memory-detail.component.css']
})
export class MemoryDetailComponent implements OnInit {

  public memory: Memory;


  constructor(private _route: ActivatedRoute, private _memoryService: MemoryService, private _location: Location, private _router : Router) { }

  ngOnInit(): void {
    this._route.data.subscribe(item => this.memory = item['memory']); //via de resolver wordt eerst de memory geladen en dan getoond.
  }
  
  deleteMemory(){
    if(confirm(`Wil je memory ${this.memory.title} verwijderen?`)){
      this._memoryService.deleteMemory(this.memory.memoryId).subscribe({
        next: () => this.deleteCompleted(),
        error: err => this.getErrorMessage(err)
    });
    }
  }

  deleteCompleted(){
    this._router.navigate(['/memories']);
  }
  
  getErrorMessage(errors: any): string {
    if (!errors) {
      return null;
    } else{
      return errors;
    }
  }

  goBack(): void{
     this._location.back();
  }
}
