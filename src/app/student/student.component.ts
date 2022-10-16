import { Register } from './../register/register';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StudentService } from './student.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, FormControl } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2'
declare var $: any;
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  model: any = {};
  StudentForm!:FormGroup;
  displayedColumns: string[] = [ 'name', 'address', 'email','phoneNumber', 'dob', 'gender','department','action']; 
  public editData:any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  updateBTN: boolean = false ;
  submitBTN: boolean = true ;
  startDate = new Date(1990, 0, 1);
  submitted = false;

  constructor(private formBuilder:FormBuilder,private studentService:StudentService) { }
  
  ngOnInit(): void {
  this.GetAllStudent()
    //Validations
  this.StudentForm=this.formBuilder.group({
      name:['',Validators.required],
      dob:['',Validators.required],
      address:['',[Validators.required,Validators.minLength(3)]],
      phoneNumber:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      gender:['',Validators.required],  
      department:['',Validators.required],  
    })
    
    $(document).ready(function(){
    $('.StudentForm').hide();
      AddButton();
      reset();
      EditButton()
      
      
    })
    function AddButton(){

      $('#AddStudent').click(function(){
        $('.StudentForm').show(function(){
          $('.StudentForm').slideDown();
        });
      })
    }
    function reset(){
      $('#reset').click(function(){
        $('.StudentForm').slideUp(1000);
      })
    }
    function EditButton(){
      $(document).ready(function(){
        $('#edit').click(function(){
          $('.StudentForm').slideDown();
        })
      })
    }
  }
  GetAllStudent(){
  this.studentService.GetAllStudent().subscribe({
    next:(Response)=>{
      // console.log(Response)
      this.dataSource=new MatTableDataSource(Response);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },
    error:()=>{
      alert('error while showing')
    }
  })   
  }
  AddStudent(){
    if(this.StudentForm.valid){
      this.studentService.saveStudent(this.StudentForm.value).subscribe({
        next:(Response)=>{
          alert('Data Saved')
          // this.StudentForm.reset();
          window.location.reload();
          this.GetAllStudent();
        },
        error:()=>{
          alert('data not saved')
        }
      })
    }
  }
  EditStudent(row:any){
    this.editData=row;
    // console.log(this.editData);
    this.StudentForm.controls['name'].setValue(this.editData.name);
    this.StudentForm.controls['address'].setValue(this.editData.address);
    this.StudentForm.controls['email'].setValue(this.editData.email);
    this.StudentForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
    this.StudentForm.controls['dob'].setValue(this.editData.dob);
    this.StudentForm.controls['gender'].setValue(this.editData.gender);
    this.StudentForm.controls['department'].setValue(this.editData.department);
    this.updateBTN = ! this.updateBTN;
    this.submitBTN=false;

          
  }
  UpdateStudent(){ 
    if(this.StudentForm.valid){
    this.studentService.updateStudent(this.StudentForm.value,this.editData.id)
    .subscribe({next:(Response)=>{
     
  window.location.reload();
  // this.StudentForm.reset();
  this.GetAllStudent();
  this.updateBTN = false;
    this.submitBTN=true;
},
error:()=>{
  alert('Failed to Update')
}
    })
  }
  }
  DeleteStudent(id:number){
    let ans = confirm(" Are You Sure Want To Delete Data")
    if (!ans) return;
this.studentService.deleteStudent(id).subscribe({next:(Response)=>{
  alert('Data Deleted')
  this.GetAllStudent();
}
})
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onSubmit() {
    this.submitted=true;
    if(this.StudentForm.invalid){
      return;
    }
    }
    
}
