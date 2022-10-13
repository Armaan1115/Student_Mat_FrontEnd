import { RegisterComponent } from './register/register.component';
import { ActiveGuardService } from './JWT/active-guard.service';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"",redirectTo:"student",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"student",component:StudentComponent,canActivate:[ActiveGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
