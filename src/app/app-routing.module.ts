import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes, CanActivate } from '@angular/router'
import { AuthGuard } from './services/auth.guard';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsComponent } from './components/students/students.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';



const routes: Routes = [
  {
    path: '',
    children:
    [
    {path: 'dashboard', component:DashboardComponent },
    {path: 'students', component: StudentsComponent },
    {path: 'student/:id', component: StudentsComponent },
    ],
    component: LayoutComponent
  },
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]}
  //{path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
