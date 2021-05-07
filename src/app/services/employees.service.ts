import { Injectable } from '@angular/core';
import { IEmployee } from 'src/app/interfaces/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  public employeeList:Array<IEmployee>=[];
  constructor() { }
  getEmployees(){
    let tempEmptData:any=window.localStorage.getItem("Employees");
    this.employeeList=JSON.parse(tempEmptData)
    return  this.employeeList;
 
   }
   addEmployee(AddEmpFormData:any){
    
    window.localStorage.setItem("Employees", "")
    window.localStorage.setItem("Employees", JSON.stringify(AddEmpFormData))
    return true
  }
}

 