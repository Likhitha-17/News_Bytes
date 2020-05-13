import { Injectable } from '@angular/core';
import  {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private hc:HttpClient) { }

  doRegister(userObj):Observable<any>
  {
    return this.hc.post('/user/signup',userObj)
  }
}
