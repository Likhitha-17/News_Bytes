import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private hc:HttpClient) { }
  category:string;

  resetPassword(reset)
  {
    return this.hc.post('/admin/forget-password',reset);
  }

  getfeedback()
  {
    return this.hc.get('/admin/admindashboard');
  }

  getcontacts()
  {
    return this.hc.get('/admin/usercontacted');
  }

  contactinfo(contObj):Observable<any>
  {
    return this.hc.post('/user/contact',contObj);
  }

  postdata(feedObj):Observable<any>
  {
    return this.hc.post('/user/feedback',feedObj);
  }


  getdata()
  {
    return this.hc.get('/admin/readnow/articles');
  }
}
