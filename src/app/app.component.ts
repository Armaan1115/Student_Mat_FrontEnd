import { LoginService } from './login/login.service';
import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Student_Mat_FrontEnd';
  constructor(public loginService:LoginService,private jwthealperService:JwtHelperService){}
  SignOutClick()
  {
    this.loginService.LogOut();
  }
  
  public isAuthorized():boolean
  {
    var token=sessionStorage.getItem('token');
    if(token)
    {
      return true
    }   
    else
    {
      return false;
    } 
  }
}
