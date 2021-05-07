import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './componets/department/department.component';
import { EmployeesComponent } from './componets/employees/employees.component';
import { ReportComponent } from './componets/report/report.component';

const routes: Routes = [
  { path: '', component: DepartmentComponent },
  { path: 'add-employee', component: EmployeesComponent },
  { path: 'reports', component: ReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


