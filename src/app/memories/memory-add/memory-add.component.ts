import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Memory } from '../memory';
import { MemoryService } from '../memory.service';
import { Location } from '@angular/common';
import { LocationMemory } from '../location';

@Component({
  selector: 'app-memory-add',
  templateUrl: './memory-add.component.html',
  styleUrls: ['./memory-add.component.css']
})
export class MemoryAddComponent implements OnInit {
  public memoryForm: FormGroup;  

  constructor(private fb: FormBuilder, private _memoryService: MemoryService, private _location: Location) { }

  ngOnInit(): void {
    this.memoryForm = this.fb.group({                   //via formbuilder hoef je niet alle FormControls te maken
      title: ['', Validators.required],                 //key - value
      subTitle: ['', [Validators.required, Validators.maxLength(50)]], //als je validators toevoegt, zet je het in een array
      startDate: ['', Validators.required], 
      endDate: ['', Validators.required], 
      country: ['', Validators.required], 
      city: ['', Validators.required]
    })
  }

  save() : void{
    console.log(this.memoryForm.value.title + " " +
      this.memoryForm.value.subTitle + " " +
      this.memoryForm.value.startDate +  " " +
      this.memoryForm.value.endDate + " " +
      this.memoryForm.value.country + " " + this.memoryForm.value.city)


   this._memoryService.postMemory$(new Memory(
     this.memoryForm.value.title, 
     this.memoryForm.value.subTitle, 
     this.memoryForm.value.startDate, 
     this.memoryForm.value.endDate,
     new LocationMemory(this.memoryForm.value.country, this.memoryForm.value.city)))
    //  .subscribe({
    //   next: () => this.saveCompleted(),
    //   error: err => this.getErrorMessage(err)
     //});
  }

  saveCompleted(): void{
    this.memoryForm.reset(); 
    console.log("komen we in savecompleted?")
    //TODO: melding geven dat het gelukt is
  }

  goBack():void{
    this._location.back(); 
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
