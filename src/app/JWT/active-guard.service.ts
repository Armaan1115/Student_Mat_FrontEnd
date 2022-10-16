import { LoginService } from './../login/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class ActiveGuardService implements CanActivate {

  constructor(private loginService:LoginService, private router:Router, private jwthealperService:JwtHelperService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean
  {
    var token=sessionStorage.getItem('token');
    if(token != null)
    {
      return true
    }   
    else
    {
      this.router.navigateByUrl("/login");
      return false;
    } 
  }
}
