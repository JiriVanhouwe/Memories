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

  public images = [];
  public memory: Memory;
  selectedFile: File = null;

  constructor(private _route: ActivatedRoute, private _memoryService: MemoryService, private _location: Location, private _router : Router) { }

  ngOnInit(): void {
    this._route.data.subscribe(item => this.memory = item['memory']); //via de resolver wordt eerst de memory geladen en dan getoond.
  }
  
  deleteMemory(){
    if(confirm(`Wil je memory ${this.memory.title} ${this.memory.id} verwijderen?`)){
      this._memoryService.deleteMemory(this.memory.id).subscribe({
        next: () => this.deleteCompleted(),
        error: err => this.getErrorMessage(err)
    });
    }
  }

  deleteCompleted(){
    this._router.navigate(['/memories']);
  }

  addFriend(){
    this._router.navigate([`/memories/${this.memory.id}/add`]);
  }

  // onFileChange(event){
  //   if (event.target.files && event.target.files[0]) {
  //     var filesAmount = event.target.files.length;
  //     for (let i = 0; i < filesAmount; i++) {
  //             var reader = new FileReader();
 
  //             reader.onload = (event:any) => {
  //               console.log(event.target.result);
  //                this.images.push(event.target.result); 
  //             }

  //             reader.readAsDataURL(event.target.files[i]);
  //     }
  //     this.postImage();
  //   } 
  // }

  onFileChange(event){
    this.selectedFile = <File> event.target.files[0];
    this.postImage();
  }

  postImage(){
    if(this.selectedFile != null){
      this._memoryService.addPhoto$(this.selectedFile, this.memory.id);
    }
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
