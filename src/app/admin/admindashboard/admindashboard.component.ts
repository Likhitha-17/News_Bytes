import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor(private ds:DataService) { }
  feedback:any[];

  ngOnInit(): void {
    this.ds.getfeedback().subscribe((res)=>{
      // console.log(res);
      this.feedback=res["message"];
    })
  }

}
