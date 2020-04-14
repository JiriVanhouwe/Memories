import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @Input() country: string;
  @Input() city: string;

  constructor() { }

  // set country(value: string){
  //   this._country = value;
  // }

  // set city(value: string){
  //   this._city = value;
  // }

  // get country(){
  //   return this.country;
  // }
  // get city(){
  //   return this.city;
  // }

  ngOnInit(): void {
  }

}
