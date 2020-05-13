import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router:Router,private rs:RegisterService) { }
  show:boolean;
    toggle()
    {
      this.show=!this.show;
    }

    private usernameLength = 6;
    private passwordPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    private emailIdPattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    model: any = {
      username: '',
      password: '',
      emailId: '',
      confirmPassword: '',
      isPasswordValid: true,
      isPasswordMatched: true,
      isUsernameValid: true,
      isRegisterEnabled: false,
      isEmailIdValid: true,
      isimageUploaded:true,
      usernameErrMsg: ''
    }

    ngOnInit(): void {
      this.show=true;
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
  
    validatePassword() {
      const parent = this;
      if (parent.passwordPattern.test(parent.model.password) == false) {
        parent.model.isPasswordValid = false;
      } else {
        parent.model.isPasswordValid = true;
      }
      parent.enableDisabledFields();
    }
  
    validateConfirmPassword() {
      const parent = this;
      if (parent.model.password === parent.model.confirmPassword) {
        parent.model.isPasswordMatched = true;
      } else {
        parent.model.isPasswordMatched = false;
      }
      parent.enableDisabledFields();
    }


  file:File;
  imgUrl:string|ArrayBuffer="";

  getImageFile(imageFile:File)
  {
    console.log("image data",imageFile);
    this.file=imageFile;
    const parent=this;
    parent.model.isimageUploaded=true;
    //create FileReader obj to read file content
    let reader=new FileReader();

    //read data from file(image)
    reader.readAsDataURL(this.file);

    //
    reader.onload=()=>{
      this.imgUrl=reader.result;
      //console.log("image data:",this.imgUrl);
    }

  }

  submitForm(formObj:NgForm)
  {
    if(this.model.isRegisterEnabled)
    {
      let fd=new FormData();
    let userObj=formObj.value;
    
    // console.log(userObj);
    //append file data to fd object
    fd.append("photo",this.file);
    //append userObj to fd
    fd.append("userObj",JSON.stringify(userObj));

    //send userObj to RegisterService
    this.rs.doRegister(fd).subscribe((res)=>{
      if(res["message"]=="username already existed")
      {
      alert("user name already exists");
      formObj.reset();
      }
      if(res["message"]=="register successfull")
      {
        alert("registration successfull");
        //navigate to login component
        this.router.navigate(['./login']);
      }
    });
    }
  }

   //------------PRIVATE METHODS--------------//

   private enableDisabledFields() {
    const parent = this;
    parent.model.isRegisterEnabled = parent.model.isUsernameValid && parent.model.isEmailIdValid
      && parent.model.isPasswordValid && parent.model.isPasswordMatched && parent.model.username.length
      && parent.model.password.length && parent.model.emailId.length && parent.model.confirmPassword.length&&parent.model.isimageUploaded;
  }
}
