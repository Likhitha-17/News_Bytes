import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    //check for the token in local storage
    let token=localStorage.getItem("token");
    //if token not existed
    //forward request object as it is
    if (token==undefined)
    {
      return next.handle(req);
    }
    //if token is existed
    //clone req object by adding token at header of it
    //forward to next interceptor/backend
    let clonedReqObj=req.clone({
      headers:req.headers.set('Authorization','Bearer '+token)
    });
    return next.handle(clonedReqObj);
  }

}
