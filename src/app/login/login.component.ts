import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  constructor(private router:Router,private ls:LoginService) {
    
   }
   show:boolean;
    toggle()
    {
      this.show=!this.show;
    }

  username:String;
  ngOnInit(): void {
    this.show=false;
    setTimeout(()=>{
      // this.ls.userLoginStatus=false;
      // this.ls.adminLoginStatus=false;
      // this.ls.role="";
      this.ls.loginStatus=false;
      this.ls.doLogout();
    },0);
  }
 
  submitForm(dataObj)
{
  this.username=dataObj.username;
  if(dataObj["role"]=="admin")
  {
  
    this.ls.adminLogin(dataObj).subscribe((result)=>{
      if(result["message"]=="invalid username")
    {
      alert("invalid username")
    }
    else if(result["message"]=="invalid password")
    {
      alert("invalid password")
    }
    else{
      alert("Admin login success");
      // this.ls.adminLoginStatus=true;
      this.ls.role="admin";this.ls.loginStatus=true;
      this.ls.username=result["username"];
      this.router.navigate(['/readnow'])
    }
    })
  }
  else
  {

  this.ls.doLogin(dataObj).subscribe((result)=>{
    if(result["message"]=="invalid username")
    {
      alert("invalid username")
    }
    else if(result["message"]=="invalid password")
    {
      // console.log(result);
      alert("invalid password")
    }
    else{
      alert("User login success")
      //save token in local storage
      localStorage.setItem("token",result["message"]);
      // this.ls.userLoginStatus=true;
      this.ls.role="user";this.ls.loginStatus=true;
      this.ls.username=result["username"];
      this.ls.image=result["image"];
      //redirect to userdashboard component
        this.router.navigate(['/readnow']);
    }
  })
}
}
}


//   this.ls.doLogin(dataObj).subscribe((result)=>{
//     if(result["message"]=="invalid username")
//     {
//       alert("invalid username")
//     }
//     else if(result["message"]=="invalid password")
//     {
//       alert("invalid password")
//     }
//     else{
//       alert("Login success")
//       //save token in local storage
//       localStorage.setItem("token",result["message"]);
//       this.ls.userLoginStatus=true;
//       this.ls.username=result["username"];
//       //redirect to userdashboard component
//       this.router.navigate(['./readnow']);
//     }
//   })
//   this.ls.doLogin(dataObj).subscribe((result)=>{
//     if(result["message"]=="invalid username")
//     {
//       alert("invalid username")
//     }
//     else if(result["message"]=="invalid password")
//     {
//       alert("invalid password")
//     }
//     else{
//       alert("Login success")
//       this.router.navigate(['./home']);
//     }
//   })
// }
  // submitForm(dataObj)
  // {
  //   // console.log(dataObj);
  //   if(dataObj.username=="admin"&&dataObj.password=="admin")
  //   {
  //     //navigate to admindashboard component
  //     this.router.navigate(['admindashboard']);
  //   }
  //   else
  //   {
  //     //navigate to userdashboard component
  //     this.router.navigate(['userdashboard']);
  //   } 
  // }

