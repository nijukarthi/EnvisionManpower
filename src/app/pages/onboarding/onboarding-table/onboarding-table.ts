import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-onboarding-table',
  imports: [Shared],
  templateUrl: './onboarding-table.html',
  styleUrl: './onboarding-table.scss'
})
export class OnboardingTable implements OnInit {
  offSet = 0;
  pageSize = 10;
  onboardingListLength = 0;
  first = 0;

  loading = false;

  onboardingList: any;
  selectedCandidates: any[] = [];

  private fb = inject(FormBuilder);

  constructor(private apiService: Apiservice, private messageService: MessageService){}

  ngOnInit(): void {
    this.fetchOnboardingCandidateList();
    console.log(this.onboardingListLength);
  }

  fetchOnboardingCandidateList(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }
      console.log("sending data to backend:", data);
      this.loading = true;

      this.apiService.fetchOnboardingCandidateList(data).subscribe({
          next: (val) => {
            console.log(val);
            this.onboardingList = val?.data?.data.map((onboarding: any) => ({
              ...onboarding,
              employmentDetails: {
                ...onboarding.employmentDetails,
                expectedJoiningDate: onboarding.employmentDetails.expectedJoiningDate ? new Date(onboarding.employmentDetails.expectedJoiningDate) : null,
                joiningDate: onboarding.employmentDetails.joiningDate ? new Date(onboarding.employmentDetails.joiningDate) : null
              },
            }));
            this.onboardingListLength = val?.data?.length || 0;
            this.loading = false;
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
          }
      })
    } catch (error) {
      console.log(error);
    }
  }

  moveCandidateToOnroll(){
    const employmentIds = this.selectedCandidates.map((c: any) => c.employmentDetails.employmentId);
    console.log(employmentIds);

    const data = {
      ids: employmentIds
    }
    console.log(data);

    this.apiService.moveCandidatesToOnroll(data).subscribe({
      next: val => {
        console.log(val);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully Moved Candidates to On-roll Employees'});
        this.selectedCandidates = [];
        setTimeout(() => {     
          this.fetchOnboardingCandidateList();
        }, 1000);
      },
      error: err => {
        console.log(err);

        if (err.status === 400) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
        }
      }
    })
  }

  submitOnboardingForm(onboardingForm: any){
    console.log(onboardingForm);
    
    const data = {
      employmentDetails: {
        employmentId: onboardingForm.employmentDetails.employmentId,
        expectedJoiningDate: onboardingForm.employmentDetails.expectedJoiningDate,
        joiningDate: onboardingForm.employmentDetails.joiningDate
      },
      phoneNumber: onboardingForm.phoneNumber,
      alternativeNumber: onboardingForm.alternativeNumber,
      uan: onboardingForm.uan,
      aadharNumber: onboardingForm.aadharNumber
    };

    console.log(data);

    this.apiService.updateOnboardCandidates(data).subscribe({
      next: val => {
        console.log(val);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Candidate Details Updated Successfully'});
        setTimeout(() => {       
          this.fetchOnboardingCandidateList();
        }, 1000);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  pageChange(event: any){
    console.log("Event:", event);
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;
    console.log("checking:", { offSet: this.offSet, pageSize: this.pageSize });
    this.fetchOnboardingCandidateList();
  }

  
}
