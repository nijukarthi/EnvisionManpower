import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

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
  sitePerformancesListLength = 0;
  employmentId = 0;

  sitePerformancesList: any;
  employeeDetails: any[] = [];

  private fb = inject(FormBuilder);
  private router = inject(Router);

  resignationRequestForm = this.fb.group({
    resignationDetails: this.fb.array([this.resignEmployee()])
  })

  resignEmployee(){
    return this.fb.group({
      employmentId: [0],
      ndcFromSiteHead: [false],
      ndcFromConsultancy: [false]
    })
  }

  get resignationDetails(){
    return this.resignationRequestForm.get('resignationDetails') as FormArray;
  }
  
  constructor(private apiService: Apiservice, private messageService: MessageService){}

  getMenuItems(performance: any){
    return [
      {
        label: 'Transfer',
        icon: 'pi pi-file-export',
        command: () => this.router.navigate(['/home/transfer/update'], {
          state: {
            employeeDetails: performance.employmentDetails
          }
        })
      },
      {
        label: 'Resignation',
        icon: 'pi pi-file-excel',
        command: () => this.resignateEmployee(performance)
      }
    ]
  }

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
          this.sitePerformancesListLength = val.data.length ?? 0;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  resignateEmployee(performance: any){
    try {
      this.openTerminateModal = true;
      this.employmentId = performance.employmentDetails.employmentId
    } catch (error) {
      console.log(error);
    }
  }

  selectedEmployee(performance: any){
    console.log(performance);
    this.employeeDetails.push({
      employmentId: performance.employmentDetails.employmentId,
      projectId: performance.employmentDetails.project.projectId
    })
    console.log(this.employeeDetails);
  }

  onSubmit(){
    try {    
      console.log(this.resignationRequestForm.value);
      this.resignationDetails.at(0).patchValue({
        ...this.resignationDetails.value,
        employmentId: this.employmentId
      })

      const data = this.resignationDetails.value;
      console.log(data);

      this.apiService.employeeResignation(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Resignation Request Created Successfully'});
          this.openTerminateModal = false;
          this.resignationRequestForm.reset();
          this.fetchCandidateSitePerformance();
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
            this.openTerminateModal = false;
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  pageChange(event: any){
    console.log("Event:", event);
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;
    this.fetchCandidateSitePerformance();
  }
}
