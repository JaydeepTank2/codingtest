import { Injectable } from '@angular/core';
import {IDepartment} from "../interfaces/department"

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
public departmentList:Array<IDepartment>=[];

  constructor() { }
  getDepartments(){
    let tempEmptData:any=window.localStorage.getItem("departments");
    this.departmentList=JSON.parse(tempEmptData)
    return  this.departmentList;
 
   }
   addDeparmnet(departments:any){
    
    window.localStorage.setItem("departments", "");
    window.localStorage.setItem("departments", JSON.stringify(departments))
    return true
  }
}


