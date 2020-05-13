import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

    headline:any[];
  
  constructor(private hc:HttpClient,private ds:DataService) { }
  dept:string;

  ngOnInit(): void {
    console.log("This is articles",this.ds.category);
    this.dept=this.ds.category;
    //var value=givedata();
    this.ds.getdata().subscribe((result)=>{
      console.log(result["message"]);
      // this.headline=result["message"][0].news+" "+result["message"][0].url;
      // this.headline=result["message"][1].news+" "+result["message"][1].url;
      this.headline=result["message"];
    })
  }
   

}
