import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private messageLength=1;

  constructor(private router:Router,private ds:DataService,private ls:LoginService) { }

    private usernameLength = 6;
    private emailIdPattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    model: any = {
      username: '',
      msg:'',
      emailId: '',
      ismsg:true,
      isUsernameValid: true,
      isRegisterEnabled: false,
      isEmailIdValid: true,  
      usernameErrMsg: ''
    }

    validateMessage(){
      const parent=this;
      if(parent.model.msg.length<parent.messageLength){
        parent.model.ismsg=false;
      }
      else{
        parent.model.ismsg=true;
      }
      parent.enableDisabledFields();
    }

    isUserNamePopulated() {
      const parent = this;
      if (parent.model.username.length < parent.usernameLength) {
        parent.model.usernameErrMsg = 'Invalid, Must have atleast 6 chars.';
        parent.model.isUsernameValid = false;
      } else {
        parent.model.isUsernameValid = true;
      }
      parent.enableDisabledFields();
    }

    validateEmail() {
      const parent = this;
      if (parent.emailIdPattern.test(parent.model.emailId) == false) {
        parent.model.isEmailIdValid = false;
      } else {
        parent.model.isEmailIdValid = true;
      }
      parent.enableDisabledFields();
    }


  ngOnInit(): void {
  }
  submitForm(userObj)
  {
    if(this.model.isRegisterEnabled)
    {
      userObj.image=this.ls.image;
      this.ds.contactinfo(userObj).subscribe((res)=>{
      alert(res["message"]);
      this.router.navigate(['/readnow']);
    })
    }
  }


   //------------PRIVATE METHODS--------------//

   private enableDisabledFields() {
    const parent = this;
    parent.model.isRegisterEnabled = parent.model.isUsernameValid && parent.model.isEmailIdValid&&parent.model.username.length&&
    parent.model.ismsg && parent.model.emailId.length&& parent.model.msg.length;
  }
}
