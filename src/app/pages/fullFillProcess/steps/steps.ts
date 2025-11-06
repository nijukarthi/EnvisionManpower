import { FullFillmentStatus } from '@/models/fullfillment-status/fullfillment-status.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-steps',
  imports: [Shared],
  templateUrl: './steps.html',
  styleUrl: './steps.scss'
})
export class Steps implements OnInit {
  offSet = 0;
  pageSize = 10;
  activeStep = 1;
  interviewId = 0;
  categoryId = 0;

  actionName = 'Submit';

  private fb = inject(FormBuilder);

  consultancyList: any;
  demandDetails: any;
  selectedConsultancy: any;
  interviewerList: any;
  consultancyArray: any;
  candidateList: any;
  candidateArray: any;
  assignedCandidateList: any;

  candidatePerformanceList = [
    {
      id: 1,
      candidateName: 'Praveen',
      feedback: 'Better Performance'
    },
    {
      id: 2,
      candidateName: 'Rahul',
      feedback: 'Better Performance'
    }
  ]

  performanceStatusList = [
    {
      label: 'Selected',
      value: 10
    },
    {
      label: 'Rejected',
      value: 15
    }
  ]

  firstInterviewScheduleForm = this.fb.group({
    demand: this.fb.group({
      demandId: [0]
    }),
    interviewer: this.fb.group({
      userId: [0]
    }),
    interviewDate: [''],
    interviewTime: [''],
    demandConsultancyMap: this.fb.array([])
  })

  demandConsultancyControl = new FormControl([]);
  demandHrControl = new FormControl({ value: [], disabled: true });

  assignConsultancy(userId: number): FormGroup{
    return this.fb.group({
      consultancy: this.fb.group({
        userId: [userId]
      })
    })
  }

  get demandConsultancyMap(): FormArray{
    return this.firstInterviewScheduleForm.get('demandConsultancyMap') as FormArray;
  }

  assignCandidateFirstInterviewForm = this.fb.group({
    interviewId: [0],
    candidateInterviewMappings: this.fb.array([])
  })

  candidateInterviewControl = new FormControl([]);
  candidateCodeControl = new FormControl([]);
  candidateDesignationControl = new FormControl({ value: [], disabled: true })

  assignCandidates(candidateId: number): FormGroup{
    return this.fb.group({
      candidate: this.fb.group({
        candidateId: [candidateId]
      })
    })
  }

  firstInterviewRoundForm = this.fb.group({
    interviewId: [0],
    candidateInterviewMappings: this.fb.array([])
  })

  takeFirstInterviewRound(candidateId: number): FormGroup {
    return this.fb.group({
      candidate: this.fb.group({
        candidateId: [candidateId]
      }),
      feedback: [''],
      performanceStatus: [0]
    })
  }

  get candidateInterviewMappings(): FormArray{
    return this.firstInterviewRoundForm.get('candidateInterviewMappings') as FormArray;
  }

  constructor(private apiService: Apiservice, private router: Router, private messageService: MessageService, 
    private datePipe: DatePipe){}

  ngOnInit(): void {
    this.demandDetails = history.state;

    console.log('Received Requisition ID:', this.demandDetails);
    this.fetchViewRequisition();
    this.fetchInterviewerList();
    if (this.demandDetails.fullfillmentStatus !== FullFillmentStatus.STEP1) {
      this.actionName = 'Update';
      console.log('testing');      
      this.fetchViewFirstInterview();
    }
  }

  fetchViewRequisition(){
    try {
      const data = {
        requesitionId: this.demandDetails.requesitionId
      }

      this.apiService.viewRequisition(data).subscribe({
        next: val => {
          console.log(val);
          this.categoryId = val.data.category.categoryId;
          this.fetchConsultancyByCategory(this.categoryId);
          console.log(this.activeStep);
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  stepChange(stepValue: any){
    this.activeStep = stepValue;
    console.log('Active Step:', this.activeStep);

    if (this.activeStep === 2) {
      this.fetchCandidateByCategory(this.categoryId);
    }

    if (this.demandDetails.fullfillmentStatus !== FullFillmentStatus.STEP2) {
      this.actionName = 'Update';
      this.fetchViewAssignedCandidates();
    }
  }

  fetchViewFirstInterview(){
    try {
      console.log('testing method');
      const data = {
        demandId: this.demandDetails.demandId
      }

      this.apiService.viewFirstInterview(data).subscribe({
        next: val => {
          console.log(val);
          const consultancyIds = val.data.demandConsultancyMap.map((c: any) => c.consultancy.userId);
          this.consultancyArray = consultancyIds;
          this.demandConsultancyControl.patchValue(consultancyIds);
          this.demandHrControl.patchValue(consultancyIds);

          
          const data = val.data;
          this.interviewId = data.interviewId;

          const interviewDate = data.interviewDate ? new Date(data.interviewDate) : null;
          let interviewTime = null;

          if (data.interviewDate && data.interviewTime) {
            interviewTime = new Date(`${data.interviewDate}T${data.interviewTime}`);
          }
          
          this.firstInterviewScheduleForm.patchValue({
            ...data,
            interviewDate: interviewDate,
            interviewTime: interviewTime
          })
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchConsultancyByCategory(categoryId: number){
    try {
      const data = {
        categoryId: categoryId
      }

      this.apiService.fetchConsultancyByCategory(data).subscribe({
        next: val => {
          console.log(val);
          this.consultancyList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchInterviewerList(){
    try {
      this.apiService.fetchInterviewerInfoList('').subscribe({
        next: val => {
          console.log(val);
          this.interviewerList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  selectedConsultancyId(userIds: any){
    console.log(userIds);

    if (this.demandDetails.fullfillmentStatus !== FullFillmentStatus.STEP1) {
      const newIds = userIds.filter((id: number) => !this.consultancyArray.includes(id));
      const removedIds = this.consultancyArray.filter((id: number) => !userIds.includes(id));

      try {      
        if (newIds.length > 0) {
          const data = {
            demand: {
              demandId: this.demandDetails.demandId
            },
            consultancy: {
              userId: newIds[0]
            }
          }
          console.log(data);
          this.apiService.assignNewConsultancy(data).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({severity: 'success', summary: 'Success', detail: 'Consultancy Assigned Successfully'});
              this.fetchViewFirstInterview();
            },
            error: err => {
              console.log(err);
            }
          })
        }
        if (removedIds.length > 0) {
          const data = {
            demand: {
              demandId: this.demandDetails.demandId
            },
            consultancy: {
              userId: removedIds[0]
            }
          }
          console.log(data);

          this.apiService.removeAssignedConsultancy(data).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully Removed Assigned Consultancy'});
              this.fetchViewFirstInterview();
            },
            error: err => {
              console.log(err);
            }
          })
        }
      } catch (error) {
        console.log(error);
      }

    } else {
      const demandConsultancyArray = this.demandConsultancyMap;
      demandConsultancyArray.clear();
  
      userIds.forEach((id: any) => {
        demandConsultancyArray.push(this.assignConsultancy(id))
      })
    }
    

    this.demandHrControl.setValue(userIds);

    console.log(this.firstInterviewScheduleForm.value);
  }

  formatDateAndTime(){
    console.log(this.firstInterviewScheduleForm.get('interviewDate')?.value);
    const interviewDate = new Date(this.firstInterviewScheduleForm.get('interviewDate')?.value ?? '');
    const interviewTime = new Date(this.firstInterviewScheduleForm.get('interviewTime')?.value ?? '');

    if (interviewDate && interviewTime) {
      const formattedDate = this.datePipe.transform(interviewDate, 'yyyy-MM-dd');
      const formattedTime = this.datePipe.transform(interviewTime, 'HH:mm');

      console.log('Formatted Date:', formattedDate);
      console.log('Formatted Time:', formattedTime);

      this.firstInterviewScheduleForm.patchValue({
        interviewDate: formattedDate,
        interviewTime: formattedTime
      })

      console.log(this.firstInterviewScheduleForm.value);
    }
  }

  submitFirstInterviewSchedule(){
    try {   
      this.formatDateAndTime();
      
      if (this.demandDetails.fullfillmentStatus === FullFillmentStatus.STEP1) {
        this.firstInterviewScheduleForm.patchValue({
          demand: {
            demandId: this.demandDetails.demandId
          }
        })
        console.log(this.firstInterviewScheduleForm.value);
        const data = this.firstInterviewScheduleForm.value;
  
        this.apiService.createFirstInterview(data).subscribe({
          next: val => {
            console.log(val);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Consultancy Assigned Successfully'});
            setTimeout(() => {
              this.router.navigate(['/home/demand-fullfillment']);
            }, 2000);
          },
          error: err => {
            console.log(err);
          }
        })
        
      } else {
        const { demand, demandConsultancyMap, ...rest } = this.firstInterviewScheduleForm.value;
        const data = {
          ...rest,
          interviewId: this.interviewId
        }
        console.log(data);

        this.apiService.updateFirstInterviewDetails(data).subscribe({
          next: val => {
            console.log(val);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Interview Details Updated Successfully'});
            this.fetchViewFirstInterview();
            setTimeout(() => {
              this.router.navigate(['/home/demand-fullfillment']);
            }, 2000);
          },
          error: err => {
            console.log(err);
          }
        })
      }

    } catch (error) {
      console.log(error);
    }
  }

  fetchCandidateByCategory(categoryId: number){
    console.log(categoryId);
    try {
      const data = {
        categoryId: categoryId
      }
      console.log(data);

      this.apiService.fetchCandidateInfoList(data).subscribe({
        next: val => {
          console.log(val);
          this.candidateList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchViewAssignedCandidates(){
    console.log('checking');
    try {
      const data = {
        interviewId: this.interviewId
      }
      console.log(data);

      this.apiService.viewAssignedCandidates(data).subscribe({
        next: val => {
          console.log(val);
          this.assignedCandidateList = val.data.candidateInterviewMappings;
          this.populateCandidateInterviewMappings();
          this.candidateArray = val.data.candidateInterviewMappings.map((c: any) => c.candidate.candidateId);
          this.candidateInterviewControl.patchValue(this.candidateArray);
          this.candidateCodeControl.patchValue(this.candidateArray);
          this.candidateDesignationControl.patchValue(this.candidateArray);
          this.firstInterviewRoundForm.patchValue(val.data);
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  selectedCandidateIds(selectedIds: any){
    console.log(selectedIds);

    try {  
      if (this.demandDetails.fullfillmentStatus !== FullFillmentStatus.STEP2) {
        const newIds = selectedIds.filter((id: number) => !this.candidateArray.includes(id));
        const removeIds = this.candidateArray.filter((id: number) => !selectedIds.includes(id));
  
        if (newIds.length > 0) {
          const data = {
            interviewId: this.interviewId,
            candidate: {
              candidateId: newIds[0]
            }
          }
  
          console.log(data);
  
          this.apiService.assignMoreCandidates(data).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Candidates Assigned Successfully For First Interview' });
              this.fetchViewAssignedCandidates();
            },
            error: err => {
              console.log(err);
  
              if (err.status === 400) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                this.fetchViewAssignedCandidates();
              }
            }
          })
        }

        if (removeIds.length > 0) {
          const data = {
            interviewId: this.interviewId,
            candidate: {
              candidateId: removeIds[0]
            }
          }

          console.log(data);

          this.apiService.removeAssignedCandidates(data).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Removed Assigned Candidates' });
              this.fetchViewAssignedCandidates();
            },
            error: err => {
              console.log(err);
            }
          })
        }
      }
    } catch (error) {
      console.log(error);
    }

    const candidateFormArray = this.assignCandidateFirstInterviewForm.get('candidateInterviewMappings') as FormArray;
    candidateFormArray.clear();

    selectedIds.forEach((id: any) => {
      candidateFormArray.push(this.assignCandidates(id))
    })

    this.candidateInterviewControl.setValue(selectedIds);
    this.candidateCodeControl.setValue(selectedIds);
    this.candidateDesignationControl.setValue(selectedIds);
    console.log(this.assignCandidateFirstInterviewForm.value);
  }

  submitStep2Form(){
    try {
      const data = {
        ...this.assignCandidateFirstInterviewForm.value,
        interviewId: this.interviewId
      }

      console.log(data);

      this.apiService.assignCandidatesFirstInterview(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Candidates Assigned Successfully For First Interview'});
          setTimeout(() => {
            this.router.navigate(['/home/demand-fullfillment']);
          }, 2000);
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  populateCandidateInterviewMappings(){
    const formArray = this.candidateInterviewMappings;
    formArray.clear();

    this.assignedCandidateList.forEach((candidate: any) => {
      formArray.push(this.takeFirstInterviewRound(candidate.candidate.candidateId))
    })
  }

  submitStep3Form(){
    try {
      console.log(this.firstInterviewRoundForm.value);
      
      const data = {
        ...this.firstInterviewRoundForm.value,
        interviewId: this.interviewId
      }

      console.log(data);

      this.apiService.firstInterviewRoundStatus(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'First Interview Conducted Successfully' });
          this.fetchViewAssignedCandidates();
          setTimeout(() => {
            this.router.navigate(['/home/demand-fullfillment']);
          }, 2000);
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
