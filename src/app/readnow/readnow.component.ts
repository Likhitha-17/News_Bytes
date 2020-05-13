import { Component, OnInit } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { DataService } from '../data.service';

@Component({
  selector: 'app-readnow',
  templateUrl: './readnow.component.html',
  styleUrls: ['./readnow.component.css']
})
export class ReadnowComponent implements OnInit {

  constructor(private ds:DataService) { }
  
  click(val){
    this.ds.category=val;
  }

  ngOnInit(): void {
    
  }
  

}
