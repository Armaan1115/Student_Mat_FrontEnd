import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Register } from './register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  SignUpForm!:FormGroup;
  model: any = {};
  hide = true;
  email: any;

  constructor(private formBuilder:FormBuilder,private registerService:RegisterService, private router:Router) { }

  ngOnInit(): void {
    this.SignUpForm=this.formBuilder.group({
      name:['',Validators.required],
      phoneNumber:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    })
  }
  RegisterUser(){
    this.registerService.registerUser(this.SignUpForm.value).subscribe(Response=>{
      this.router.navigateByUrl("student") 
    })
  }
  onSubmit() {console.log(this.model);}
     getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  BackToLogin(){
    this.router.navigateByUrl("login") 
  }

}
