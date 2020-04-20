import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Memory } from '../memory';
import { MemoryService } from '../memory.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-memory-edit',
  templateUrl: './memory-edit.component.html',
  styleUrls: ['./memory-edit.component.css']
})
export class MemoryEditComponent implements OnInit {
  public memoryForm: FormGroup;
  public memory: Memory;
  private _fileToUpload: File = null
  
  constructor(private fb: FormBuilder, private _route: ActivatedRoute, private _memoryService: MemoryService, private _location: Location, private http: HttpClient) { }

  ngOnInit(): void {
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

     this.displayData();
  }

  displayData():void{
    let data = {
      title: this.memory.title,
      subTitle: this.memory.subTitle,
      startDate: this.memory.startDate,
      endDate: this.memory.endDate,
      country: this.memory.location.country,
      city: this.memory.location.city
    }
    this.memoryForm.setValue(data);
  }

  handleFileInput(file: FileList){
    this._fileToUpload = file.item(0);
    console.log("Ja toch");
    
  }

  onSubmit(){
    console.log("komen we hier");
    this._memoryService.postFile(this.memory, this._fileToUpload).subscribe(
      data => {
        console.log('Upload photo done.');
      } 
    )
  }

  save() : void{
    if(this.memoryForm.valid){
      if(this.memoryForm.dirty){ //checken of er iets gewijzigd werd
        const mem = {...this.memory, ...this.memoryForm.value}; //checkt welke waarden anders zijn

        this._memoryService.updateMemory$(mem).subscribe({
          next: () => this.saveCompleted(),
          error: err => this.getErrorMessage(err)
        })
      }
    }
  }

  saveCompleted():void{
    this.memoryForm.reset(); 
    this.goBack();
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
