import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Memory } from '../memory';

@Component({
  selector: 'app-memory-add',
  templateUrl: './memory-add.component.html',
  styleUrls: ['./memory-add.component.css']
})
export class MemoryAddComponent implements OnInit {
  @Output() public newMemory = new EventEmitter<Memory>();
  public memoryForm: FormGroup;
  

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.memoryForm = this.fb.group({                   //via formbuilder hoef je niet over FormControls te maken
      title: ['', Validators.required],                 //key - value
      subTitle: ['', [Validators.required, Validators.maxLength(50)]], //als je validators toevoegt, zet je het in een array
      startDate: ['', Validators.required], 
      endDate: ['', Validators.required], 
      country: ['', Validators.required], 
      city: ['', Validators.required]
    })
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
