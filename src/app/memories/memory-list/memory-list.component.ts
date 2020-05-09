import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Memory } from '../memory';
import { MemoryService } from '../memory.service';
import { Observable, Subject, EMPTY } from 'rxjs';
import { distinctUntilChanged, debounceTime, map, catchError, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-memory-list',
  templateUrl: './memory-list.component.html',
  styleUrls: ['./memory-list.component.css']
})

export class MemoryListComponent implements OnInit {
  private _listFilter : string = '';
  public filterMemories$ = new Subject<string>();
  private _memories$: Observable<Memory[]>;

  public errorMessage: string = '';

  constructor(private memoryService: MemoryService, private _router : Router, private _route: ActivatedRoute) { 
    this.filterMemories$.pipe(
      distinctUntilChanged(),
      debounceTime(400))
    .subscribe(val => {
      const params = val? {queryParams: {filter:val}} :undefined;
      this._router.navigate(['/memories'], params); 
    });

    this._memories$ = this._route.queryParams.pipe(
      switchMap((params) => 
      { 
        if(params['filter']){
          this._listFilter = params['filter'];
        }
      return this.memoryService.getMemories$(params['filter']);
    })
    )
      .pipe(catchError((err) => {
        this.errorMessage = err;
        return EMPTY;
      }));
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

    deleteMemory(id:number){
      if(confirm(`Wil je deze memory verwijderen?`)){
        this.memoryService.deleteMemory(id);
      }
    }

  clickAddMemory():void{
    this._router.navigate(['memories/add']);
  }

  ngOnInit(): void {  
    //this._memories$ = this.memoryService.getMemories$();   
  }

}
