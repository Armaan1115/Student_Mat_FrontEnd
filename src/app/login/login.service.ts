import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  CurrentUserName:any="";
  constructor(private http:HttpClient,private router:Router,) { }
  registerUser(loginUser:any){
    return this.http.post<any>("https://localhost:44354/api/user/LoginUser",loginUser)
    .pipe(map(u=>{
      if(u)
      {
        this.CurrentUserName=u.email;
        sessionStorage["token"]=JSON.stringify(u.token);      
      }
      return u;
    }))
  }
  LogOut()
  {
    this.CurrentUserName="";
    sessionStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }
  }

