import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Memory } from '../memory';
import { MemoryService } from '../memory.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-memory-edit',
  templateUrl: './memory-edit.component.html',
  styleUrls: ['./memory-edit.component.css']
})
export class MemoryEditComponent implements OnInit {
  public memoryForm: FormGroup;
  public memory: Memory;
  private _sub: Subscription;
 
  
  constructor(private fb: FormBuilder, private _route: ActivatedRoute, private _memoryService: MemoryService) { }

  ngOnInit(): void {
    //id uit de route halen
    // this._sub = this._route.paramMap.subscribe(
    //   params => {
    //     const id = params.get('id');
    //     this.getMemory$(id);
    //   })

      this._route.paramMap.subscribe(pa => 
        this._memoryService.getMemory$(pa.get('id')).subscribe(item => (this.memory = item)));
    
  
    this.memoryForm = this.fb.group({                  
      title: ['', Validators.required],                 
      subTitle: ['', [Validators.required, Validators.maxLength(50)]], 
      startDate: ['', Validators.required], 
      endDate: ['', Validators.required], 
      country: ['', Validators.required], 
      city: ['', Validators.required]
    })
  }

  getMemory$(id:string){

  }

  ngOnDestroy():void{
    this._sub.unsubscribe();
  }

  save() : void{
    console.log(this.memoryForm);
  }


  getErrorMessage(errors: any): string {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'Dit is een verplicht veld.';
    } else if (errors.maxLength) {
      return 'Maximaal vijftig karakters.';
    } 
  }

}
