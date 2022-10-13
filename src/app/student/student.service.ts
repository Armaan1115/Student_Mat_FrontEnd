import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './student';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService 
{
  baseUrl="https://localhost:44354/api/Student";
  constructor(private httpClient:HttpClient) { }
  GetAllStudent(): Observable<any> 
  {
    return this.httpClient.get<any>(this.baseUrl);
  }
  saveStudent(newStudent:Student):Observable<Student>
  {
    return this.httpClient.post<Student>(this.baseUrl,newStudent);
  }
  updateStudent(data:any,id:number)
  {
    return this.httpClient.put<Student>("https://localhost:44354/api/Student/" + id,data);
  }
  deleteStudent(id:number):Observable<any>
  {
    return this.httpClient.delete<any>("https://localhost:44354/api/Student/" + id);
  }
}
