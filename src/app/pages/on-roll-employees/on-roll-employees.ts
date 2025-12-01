import { Column } from '@/models/table-column/table-column';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-on-roll-employees',
  imports: [Shared],
  templateUrl: './on-roll-employees.html',
  styleUrl: './on-roll-employees.scss'
})
export class OnRollEmployees implements OnInit {
  offSet = 0;
  pageSize = 10;
  first = 0;
  onrollEmployeeListLength = 0;

  cols!: Column[];

  openPpeDetails = false;

  onrollEmployeeList: any;
  onrollPpeDetails: any;

  constructor(private apiService: Apiservice) {}

  ngOnInit(): void {
    this.fetchActiveOnrollEmployees();
  }

  fetchActiveOnrollEmployees(){
    try {   
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }
      console.log(data);
      this.apiService.fetchOnRollCandidates(data).subscribe({
        next: val => {
          console.log(val);
          this.onrollEmployeeList = val?.data.data;
          this.onrollEmployeeListLength = val?.data.length ?? 0;

          this.cols = [
            { field: 'employeeCode', header: 'Employee Code', customExportHeader: 'Employee Code' },
            { field: 'candidateName', header: 'Employee Name' },
            { field: 'employmentDetails.project.projectCode', header: 'Project Code' },
            { field: 'employmentDetails.project.siteName', header: 'Site Name' },
            { field: 'employmentDetails.cluster.clusterName', header: 'Cluster Name'},
            { field: 'employmentDetails.spn.spnCode', header: 'SPN Code' },
            { field: 'employmentDetails.spn.spnDescription', header: 'SPN Description' },
            { field: 'employmentDetails.spn.experience', header: 'Experience' },
            { field: 'employmentDetails.envisionRole.roleName', header: 'Role'},
            { field: 'employmentDetails.expectedJoiningDate', header: 'Expected DOJ' },
            { field: 'employmentDetails.joiningDate', header: 'Actual DOJ' },
            { field: 'phoneNumber', header: 'Contact Number'},
            { field: 'alternativeNumber', header: 'Emergency Contact Number' },
            { field: 'uan', header: 'UAN'},
            { field: 'aadharNumber', header: 'Aadhar Number' },
          ]
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  getNestedValue(obj: any, path: string){
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) ?? '-';
  }

  viewPpeDetails(onroll: any){
    try {
      this.openPpeDetails = true;
      this.onrollPpeDetails = onroll.ppeDetails;
    } catch (error) {
      console.log(error);
    }
  }

  pageChange(event: any){
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;
    this.fetchActiveOnrollEmployees();
  }
}
