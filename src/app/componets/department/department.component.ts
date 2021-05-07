import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  FormControl } from '@angular/forms';
import { DepartmentsService } from 'src/app/services/departments.service';
import {IDepartment} from "../../interfaces/department"
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  public addDepartmentGroup!: FormGroup;
  public fomrErro: boolean = false;
  public devptId:number = 1;
  public departmentList:Array<IDepartment>=[];
  public duplicatedept:boolean=false;

  constructor(private formBuilder: FormBuilder, private departmentsService:DepartmentsService) {
    this.addDepartmentGroup = this.formBuilder.group({
      departmentName: ["", [ Validators.required]]
    }); 
   }
   get frm() {
      return this.addDepartmentGroup.controls;
  }
  ngOnInit(): void {
    this.departmentList= this.departmentsService.getDepartments()
  }
  validate(){
    this.duplicatedept=false;
    this.fomrErro=true;
  }
  saveDeaprtment(){
      if (this.addDepartmentGroup.invalid) {
        this.fomrErro=true;
        return;
      }
      this.departmentList= this.departmentsService.getDepartments()
      if(this.departmentList){
        let that=this;
        this.departmentList.map(function(val:IDepartment){
          if(val.Name ===that.addDepartmentGroup.value["departmentName"]){
            that.duplicatedept=true
          }
        })
        if(this.duplicatedept === false){
          this.departmentList.push({
            "ID":String( this.departmentList.length + 1),
            "Name":that.addDepartmentGroup.value["departmentName"],
          })
        }
        else {
         // this.duplicatedept=false;
          return
        }
    }
    else {
      this.departmentList=[];
      this.departmentList.push({
        "ID":'1',
        "Name":this.addDepartmentGroup.value["departmentName"],
      })
    }
    this.departmentsService.addDeparmnet(this.departmentList)
    this.fomrErro=false;
    this.duplicatedept=false;
    this.clearFromData();
  }
  clearFromData(){
    this.addDepartmentGroup.setValue({
      departmentName: "",
    });
  }
}
