import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  

 
  
  constructor(private fb: FormBuilder, private _route: ActivatedRoute, private _memoryService: MemoryService) { }

  ngOnInit(): void {
      this._route.paramMap.subscribe(pa => 
        this._memoryService.getMemory$(pa.get('id')).subscribe(item => (this.memory = item)));
    
  
    this.memoryForm = this.fb.group({                  
      title: ['', Validators.required],                 
      subTitle: ['', [Validators.required, Validators.maxLength(50)]], 
      startDate: ['', Validators.required], 
      endDate: ['', Validators.required], 
      country: ['', Validators.required], 
      city: ['', Validators.required],
      tags: this.fb.array([])
    })

    this.displayData();
  }

  displayData():void{
    this.memoryForm.setValue({
      title: this.memory.title,
      subTitle: this.memory.subTitle,
      startDate: this.memory.startDate,
      endDate: this.memory.endDate,
      country: this.memory.location.country,
      city: this.memory.location.city

    })

  }

  save() : void{
    console.log(this.memoryForm);
  }

  get tags(): FormArray{
    return <FormArray>this.memoryForm.get('tags');
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
