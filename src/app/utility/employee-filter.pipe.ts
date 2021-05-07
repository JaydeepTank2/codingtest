import { Pipe, PipeTransform } from '@angular/core';
import { IEmployee } from 'src/app/interfaces/employee';
@Pipe({
  name: 'employeeFilter'
})
export class EmployeeFilterPipe implements PipeTransform {

  transform(items: Array<IEmployee>, depname: string, managerName: string){
    if (items && items.length){
        return items.filter(item =>{
            if (depname && String( item.departmentId).toLowerCase().indexOf(depname.toLowerCase()) === -1){
                return false;
            }
            if (managerName && String( item.reportingManager).toLowerCase().indexOf(managerName.toLowerCase()) === -1){
                return false;
            }
            
            return true;
    })
    }
    else{
        return items;
    }
}
}
