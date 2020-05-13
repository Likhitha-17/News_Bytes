import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-forget-passsword',
  templateUrl: './forget-passsword.component.html',
  styleUrls: ['./forget-passsword.component.css']
})
export class ForgetPassswordComponent implements OnInit {

  constructor(private ds:DataService,private router:Router) { }

  private passwordPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
  model: any = {
    password: '',
    isPasswordValid: true
  }
  validatePassword() {
    const parent = this;
    if (parent.passwordPattern.test(parent.model.password) == false) {
      parent.model.isPasswordValid = false;
    } else {
      parent.model.isPasswordValid = true;
    }
    parent.enableDisabledFields();
  }

  show:boolean;
    toggle()
    {
      this.show=!this.show;
    }

  ngOnInit(): void {
    this.show=true;
  }
  submitForm(reset){
    if(this.model.isRegisterEnabled)
    {
      this.ds.resetPassword(reset).subscribe((result)=>{
        if(result["message"]=="invalid username")
        {
          alert("invalid username")
        }
        else{
          alert("Reset successfully");
          this.router.navigate(['/login']);
        }
      })
    }
    //console.log("This is reset");
  }

  //------------PRIVATE METHODS--------------//

  private enableDisabledFields() {
    const parent = this;
    parent.model.isRegisterEnabled = parent.model.isPasswordValid && parent.model.password.length;
  }
}

