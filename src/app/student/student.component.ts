import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  model: any = {};
  StudentForm!:FormGroup
  constructor(private formBuilder:FormBuilder) { }
  
  ngOnInit(): void {

    //Validations
    this.StudentForm=this.formBuilder.group({
      name:['',Validators.required],
      dob:['',Validators.required],
      address:['',[Validators.required,Validators.minLength(3)]],
      phoneNumber:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      gender:['',Validators.required],  
      gepartment:['',Validators.required],  
    })
  }


























  onSubmit() {
    console.log(this.model);
    }

}
