import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componets/header/header.component';
import { DepartmentComponent } from './componets/department/department.component';
import { EmployeesComponent } from './componets/employees/employees.component';
import { ReportComponent } from './componets/report/report.component';
import { EmployeeFilterPipe } from './utility/employee-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
   
    DepartmentComponent,
    EmployeesComponent,
    ReportComponent,
    EmployeeFilterPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

