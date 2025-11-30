import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transfer-form',
  imports: [Shared],
  templateUrl: './transfer-form.html',
  styleUrl: './transfer-form.scss'
})
export class TransferForm implements OnInit {
  demandList: any[] = [];
  demandDetails: any;
  employeeDetails: any;

  private fb = inject(FormBuilder);

  constructor(private apiService: Apiservice, private messageService: MessageService, private router: Router){}

  transferForm = this.fb.group({
    transferDetails: this.fb.array([this.transferEmployee()])
  });

  get transferDetails(){
    return this.transferForm.get('transferDetails') as FormArray;
  }

  transferEmployee(){
    return this.fb.group({
      transferFrom: this.fb.group({
        employmentId: [0],
      }),
      transferTo: this.fb.group({
        demandId: [0]
      }),
      joiningDate: [''],
      isReplacementRequired: [false]
    })
  }

  isReplacement = [
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
    this.employeeDetails = history.state;
    console.log(this.employeeDetails);
    this.fetchDemandDetails();
  }

  fetchDemandDetails(){
    try {
      const data = {
        spnId: this.employeeDetails.employeeDetails.spn.spnId
      }
      console.log(data);

      this.apiService.fetchDemandDetails(data).subscribe({
        next: val => {
          console.log(val);
          this.demandList = val.data.filter((d: any) => d.demandStatus === 102 && 
            d.departmentHeadApproval.approvalStatus === 200 && d.stateHeadApproval.approvalStatus === 200 &&
            d.envisionRole);
          console.log(this.demandList);
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  selectedDCode(demandId: number){
    console.log(demandId);
    this.demandDetails = this.demandList.find((d) => d.demandId === demandId);
    console.log(this.demandDetails);
  }

  onSubmit(){
    try {
      console.log(this.transferForm.value);
      this.transferDetails.at(0).patchValue({
        ...this.transferDetails.value,
        transferFrom: {
          employmentId: this.employeeDetails.employeeDetails.employmentId
        }
      });

      const data = this.transferDetails.value;
      console.log(data);

      this.apiService.transferCandidateProject(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Transfer Request Created Successfully'});
          setTimeout(() => {         
            this.router.navigate(['/home/site-performance']);
          }, 2000);
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}
