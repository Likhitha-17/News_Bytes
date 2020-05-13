import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-usercontacted',
  templateUrl: './usercontacted.component.html',
  styleUrls: ['./usercontacted.component.css']
})
export class UsercontactedComponent implements OnInit {

  constructor(private ds:DataService) { }

  contacts:any[];

  ngOnInit(): void {
    this.ds.getcontacts().subscribe((res)=>{
      // console.log(res);
      this.contacts=res["message"];
    })
  }
  }

