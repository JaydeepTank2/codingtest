import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  FormControl } from '@angular/forms';
import { IEmployee } from 'src/app/interfaces/employee';
import { DepartmentsService } from 'src/app/services/departments.service';
import {EmployeesService} from 'src/app/services/employees.service'
import {IDepartment} from "../../interfaces/department"
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  public departmentList:Array<IDepartment>=[];
  public employeeList:Array<IEmployee>=[];
  public reportingManager:Array<IEmployee>=[];
  public filteredEmpTypeList:any=[];
  public filterReport: FormGroup;
  public EmpTypeList=[
    {id:1, type:"Manager"},
    {id:2, type:"Worker"},
  ]
  constructor(private formBuilder: FormBuilder, private departmentsService:DepartmentsService, private employeesService:EmployeesService) {
    this.filterReport = this.formBuilder.group({
      department: [""],
      reportingManagerId: [""],
     
    });
   }

  ngOnInit(): void {
    this.departmentList= this.departmentsService.getDepartments();
    this.employeeList= this.employeesService.getEmployees();
    if(this.employeeList){
      this.refreshfilterData();
      
    }
    else {
      this.employeeList=[]
      this.filteredEmpTypeList= this.EmpTypeList.filter(emp => emp.id===1);
   
      this.reportingManager=[]; 
    }
  }
  getManagerName(id:string){
    let _managerName:any=[]
    let tempName:string=""
    this.reportingManager.filter(function(emp:any){
      if(emp.id.toString()=== id.toString()){
        tempName=emp.emplyoyeeName;
        return ;
      }
    });
    return tempName;
  }
  
  getEmpTypeName(id:string){
    if(id==="1"){
      return "Manager"
    }
    else {
      return "Worker"
    }
    
  }
  getDeptName(id:string){
    let _deptName =""
     this.departmentList.filter(function(dep:any){
      if(dep.ID.toString() === id.toString()){
        return _deptName=dep.Name;
      }
    });
    return _deptName;
  }
  refreshfilterData(){
    this.reportingManager= this.employeeList.filter(function(emp:any){
      if(emp.employeeeType === "1"){
        return emp;
      }
    });
    this.filteredEmpTypeList= this.employeeList.map(function(val:any){
      return val;
    })
  }

}

