import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-site-performance',
  imports: [Shared],
  templateUrl: './site-performance.html',
  styleUrl: './site-performance.scss'
})
export class SitePerformance implements OnInit {
  openTerminateModal = false;

  offSet = 0;
  pageSize = 10;
  first = 0;

  sitePerformancesList: any;

  constructor(private apiService: Apiservice){}

  private router = inject(Router);

  actionItems: MenuItem[] = [
    {
      label: 'Transfer',
      icon: '',
      command: () => this.router.navigate(['/home/transfer/update'])
    },
    {
      label: 'Resignation',
      icon: '',
      command: () => this.openTerminateModal = true
    }
  ]

  noDueClearanceList = [
    {
      label: 'Yes',
      value: true
    },
    {
      label: 'No',
      value: false
    }
  ]

  sitePerformanceList = [
    {
      id: 1,
      employeeCode: 'EMP-C-0005',
      candidateCode: 'SAN010',
      pCode: 'P8001',
      employeeName: 'Sandhya',
      site: 'P8001-KA',
      state: 'Karnataka',
      designation: 'QA/QC Engineer',
      expectedDoj: '17-11-2025',
      actualDoj: '20-11-2025',
      contact: '9498490284',
      eContact: '9929067283',
      uan: '125474839990',
      aadharNo: '637282819087',
      ppeType: 'Safety Helmet'
    },
    {
      id: 2,
      employeeCode: 'EMP-C-0007',
      candidateCode: 'SUM012',
      pCode: 'P8002',
      employeeName: 'Suman',
      site: 'P8001-TN',
      state: 'Tamil Nadu',
      designation: 'QA/QC Engineer',
      expectedDoj: '12-11-2025',
      actualDoj: '20-11-2025',
      contact: '9498000284',
      eContact: '9929077283',
      uan: '125470039990',
      aadharNo: '637282119087',
      ppeType: 'Gloves'
    }
  ] 

  ngOnInit(): void {
    this.fetchCandidateSitePerformance();
  }

  fetchCandidateSitePerformance(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }
      console.log(data);

      this.apiService.fetchCandidateSitePerformance(data).subscribe({
        next: val => {
          console.log(val);
          this.sitePerformancesList = val.data.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}
