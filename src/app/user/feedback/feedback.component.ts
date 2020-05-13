import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { $ } from 'protractor';



@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  
  constructor(private ds:DataService,private router:Router,private ls:LoginService) { }

  private feedbackLength = 1;
  model: any = {
    count:0,
    feedback:'',
    isfeedBack:true,
    israting:true,
    isRegisterEnabled: false
  }

  validatefeedBack(){
    const parent=this;
    if(parent.model.feedback.length<parent.feedbackLength){
      parent.model.isfeedBack=false;
    }
    else{
      parent.model.isfeedBack=true;
    }
    parent.enableDisabledFields();
  }

  // count:number;
  username:any;
  image:any;
  check(val){
    const parent=this;
    parent.model.count=val;
    if(val==0)
      parent.model.israting=false;
    else
      parent.model.israting=true;
    parent.enableDisabledFields();
  }
  ngOnInit(): void {
    const parent=this;
    parent.model.count=0;
    this.username=this.ls.username;
    this.image=this.ls.image;
  }
  submitForm(FeedObj)
  {
    const parent=this;
    if(this.model.isRegisterEnabled)
    {
      FeedObj.username=this.username;
      FeedObj.image=this.image;
      FeedObj.rating=parent.model.count;
      console.log(FeedObj);
      this.ds.postdata(FeedObj).subscribe((res)=>{
      alert(res["message"]);
      this.router.navigate(['/readnow']);
    })
    }
  }

  private enableDisabledFields() {
    const parent = this;
    parent.model.isRegisterEnabled = parent.model.isfeedBack&&parent.model.israting&&parent.model.count;
  }

}
