import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtintercepterService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUser=null;
    var currentUserSession=sessionStorage.getItem("token");
    if(currentUserSession!=null)
    {
      currentUser=currentUserSession;
    }
    req=req.clone({
      setHeaders:{
        Authorization:"Bearer "+currentUser
      }
    });
    return next.handle(req);
  }
}