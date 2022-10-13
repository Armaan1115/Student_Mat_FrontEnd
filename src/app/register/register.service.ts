import { Register } from './register';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 
  constructor(private http:HttpClient) { }
  registerUser(registerStudent:any){
    return this.http.post<Register>("https://localhost:44354/api/user/RegisterUser",registerStudent);
  }
}
