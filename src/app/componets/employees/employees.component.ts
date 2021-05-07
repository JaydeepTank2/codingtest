import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  FormControl } from '@angular/forms';
import { IEmployee } from 'src/app/interfaces/employee';
import { DepartmentsService } from 'src/app/services/departments.service';
import {EmployeesService} from 'src/app/services/employees.service'
import {IDepartment} from "../../interfaces/department"
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  public departmentList:Array<IDepartment>=[];
  public employeeList:Array<IEmployee>=[];
  public reportingManager:Array<IEmployee>=[];
  public filteredEmpTypeList:any=[]
  public fomrErro: boolean = false;
  public addempFromGroup!: FormGroup;
  public showManagerList:boolean=false;
  public EmpTypeList=[
    {id:"1", type:"Manager"},
    {id:"2", type:"Worker"},
  ]
  constructor(private formBuilder: FormBuilder, private departmentsService:DepartmentsService, private employeesService:EmployeesService) {
    this.addempFromGroup = this.formBuilder.group({
      departmentName: ["", [ Validators.required]],
      empName: ["", [Validators.required]],
      empType: [ "", [  Validators.required ]],
      reportingManagerId: [""],
    }); 
   }
   get frm() {
    return this.addempFromGroup.controls;
  }
  ngOnInit(): void {
    this.departmentList= this.departmentsService.getDepartments();
    this.employeeList= this.employeesService.getEmployees();
    if(this.employeeList){
      this.refreshfilterData();
      this.showManagerList = true;
    }
    else {
      this.employeeList=[]
      this.filteredEmpTypeList= this.EmpTypeList.filter(emp => emp.id==="1");
   
      this.reportingManager=[]; 
    }
    
  }
  saveEmployee(){
    if (this.addempFromGroup.invalid) {
      this.fomrErro=true;
     return;
    }
    this.fomrErro=false;
    let defaultManagerId="1";
    if(this.addempFromGroup.value["reportingManagerId"]){
      defaultManagerId=this.addempFromGroup.value["reportingManagerId"]
    }
    
    let formdata ={
      departmentId:this.addempFromGroup.value["departmentName"],
      emplyoyeeName:this.addempFromGroup.value["empName"],
      employeeeType:this.addempFromGroup.value["empType"],
      reportingManager:defaultManagerId,
      id:String(this.employeeList?.length + 1 | 1)
    }
    this.employeeList.push(formdata)
    this.employeesService.addEmployee(this.employeeList);
    this.refreshfilterData()
    this.clearFromData();
    this.showManagerList = true;
  }
  refreshfilterData(){
    this.reportingManager= this.employeeList.filter(function(emp:any){
      if(emp.employeeeType === "1"){
        return emp;
      }
    });
    this.filteredEmpTypeList= this.EmpTypeList.map(function(val:any){
      return val;
    })
  }
  
  clearFromData(){
    this.addempFromGroup.setValue({
      departmentName: "",
      empName:"",
      empType: "",
      reportingManagerId: "",
   
    });
  }

}


