import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Memory } from '../memory';

@Component({
  selector: 'app-memory-add',
  templateUrl: './memory-add.component.html',
  styleUrls: ['./memory-add.component.css']
})
export class MemoryAddComponent implements OnInit {
  @Output() public newMemory = new EventEmitter<Memory>();
  public memory: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.memory = new FormGroup({
      title: new FormControl('Parijs')
    });
  }

  onSubmit():void{
   // this.newMemory.emit(new Memory(this.memory.value.name));

  }

}
