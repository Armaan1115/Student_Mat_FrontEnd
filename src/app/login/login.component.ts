import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm!:FormGroup;
  model: any = {};
  hide = true;
  email: any;

  constructor(private formBuilder:FormBuilder,private loginService:LoginService,private router:Router,) { }

  ngOnInit(): void {
    this.LoginForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    })
  }
   LoginUser()
  {
    this.loginService.registerUser(this.LoginForm.value).subscribe(
      (response)=>{
        this.router.navigateByUrl("student") 
        // alert('Successfully Logged In')
      },
      (error)=>{
        console.log(error);
        alert(error="Wrong UserName Or Password")
      }
    )
  }
  onSubmit() {
    console.log(this.model);
    }
    getErrorMessage() {
      if (this.email.hasError('required')) {
        return 'You must enter a value';
      }
      return this.email.hasError('email') ? 'Not a valid email' : '';
    }
    RegisterClick(){
      this.router.navigateByUrl("register") 
    }
}
