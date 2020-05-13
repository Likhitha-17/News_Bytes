import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //to tell all the components whether user is logined or not
  username:String;
  image:any;
  loginStatus:boolean=false;
  role:string="";
  // userLoginStatus:boolean=false;  
  // adminLoginStatus:boolean=false;       
  //inject HttpClient
  constructor(private hc:HttpClient) { }

  //a method to make http post req
  doLogin(userObj):Observable<any>
  {
    return this.hc.post('/user/login',userObj);
  }
  adminLogin(adminObj):Observable<any>
  {
    return this.hc.post('/admin/login',adminObj);
  }  
  doLogout()
  {
    this.role="";
    localStorage.removeItem("token");
  }

}
