import { STEP_ACCESS } from '@/constants/step-access.config';
import { FullFillmentStatus } from '@/models/fullfillment-status/fullfillment-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { StepStateService } from '@/service/step-service/step-state.service';
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
  firstInterviewId = 0;
  finalInterviewId = 0;
  categoryId = 0;

  minDate: Date | undefined;

  currentUserRole = Number(sessionStorage.getItem('userGroupId'));

  private fb = inject(FormBuilder);

  fulFillmentStatus = FullFillmentStatus;
  USERGROUPS = UserGroups;

  consultancyList: any;
  demandDetails: any;
  selectedConsultancy: any;
  interviewerList: any;
  consultancyArray: any;
  candidateList: any;
  candidateArray: any;
  assignedCandidateList: any;
  finalApprovalCandidateList: any;
  joiningProcessCandidateList: any;
  assignedFinalInterviewCandidateList: any;

  constructor(private apiService: Apiservice, private router: Router, private messageService: MessageService, 
    private datePipe: DatePipe, private stepService: StepStateService){}

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

  resourceManagerStatusList = [
    {
      label: 'Accepted',
      value: 100
    },
    {
      label: 'Hold',
      value: 406
    },
    {
      label: 'Rejected',
      value: 499
    }
  ]

  candidateAcceptanceList = [
    {
      label: 'Yes',
      value: true
    },
    {
      label: 'No',
      value: false
    }
  ]

  canAccessStep(stepNumber: number){
    const allowedRoles = STEP_ACCESS[stepNumber];
    return allowedRoles.includes(this.currentUserRole) || false;
  }

  firstInterviewScheduleForm = this.fb.group({
    demand: this.fb.group({
      demandId: [0]
    }),
    interviewer: this.fb.group({
      userId: [0]
    }),
    interviewDate: [''],
    interviewTime: [new Date()],
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

  takeFirstInterviewRound(candidate: any): FormGroup {
    const isDisabled = this.demandDetails.fullfillmentStatus === FullFillmentStatus.STEP6;
    return this.fb.group({
      candidate: this.fb.group({
        candidateId: [candidate.candidate.candidateId]
      }),
      feedback: [{ value: '', disabled: isDisabled }],
      performanceStatus: [{ value: 0, disabled: isDisabled }]
    })
  }

  get candidateInterviewMappings(): FormArray{
    return this.firstInterviewRoundForm.get('candidateInterviewMappings') as FormArray;
  }

  finalInterviewerAssignForm = this.fb.group({
    interviewId: [0],
    interviewer: this.fb.group({
      userId: [0]
    }),
    interviewDate: [''],
    interviewTime: ['']
  })

  finalInterviewRoundForm = this.fb.group({
    interviewId: [0],
    candidateFinalInterviewMappings: this.fb.array([])
  })

  takeFinalInterviewRound(candidate: any): FormGroup{
    const isDisabled = this.demandDetails.fulFillmentStatus === FullFillmentStatus.STEP7;
    return this.fb.group({
      candidate: this.fb.group({
        candidateId: [candidate.candidate.candidateId],
      }),
      feedback: [{value: '', disabled: isDisabled }],
      performanceStatus: [{value: 0, disabled: isDisabled }]
    })
  }

  get candidateFinalInterviewMappings(): FormArray {
    return this.finalInterviewRoundForm.get('candidateFinalInterviewMappings') as FormArray;
  }

  finalApprovalCandidateForm = this.fb.group({
    demandId: [0],
    approvalCandidates: this.fb.array([])
  })

  takeFinalApproval(candidate: any): FormGroup{
    const isDisabled = this.demandDetails.fulFillmentStatus === FullFillmentStatus.STEP7;

    return this.fb.group({
      candidate: this.fb.group({
        candidateId: [candidate.candidate.candidateId]
      }),
      statusByResourceManager: [{value: 0, disabled: isDisabled}]
    })
  }

  get approvalCandidates(): FormArray{
    return this.finalApprovalCandidateForm.get('approvalCandidates') as FormArray;
  }

  joiningProcessCandidateForm = this.fb.group({
    demandId: [0],
    joiningProcessCandidates: this.fb.array([])
  })

  takeJoiningProcess(candidate: any): FormGroup{
    const group = this.fb.group({
      candidate: this.fb.group({
        candidateId: [candidate.candidate.candidateId],
        candidateCode: ['']
      }),
      candidateAcceptance: [candidate.candidateAcceptance ?? false],
      joiningDate: ['']
    })

    const acceptanceCtrl = group.get('candidateAcceptance');
    const joiningDateCtrl = group.get('joiningDate');
    const codeCtrl = group.get('candidate.candidateCode');

    if (this.currentUserRole === UserGroups.CONSULTANCY) {
      acceptanceCtrl?.enable();
    } else {
      acceptanceCtrl?.disable();
    }

    const fromAPI = candidate.candidateAcceptance === true;

    if (fromAPI) {
      acceptanceCtrl?.disable();
      joiningDateCtrl?.disable();
      codeCtrl?.disable();
      return group;
    }

    if (!acceptanceCtrl?.value) {
      joiningDateCtrl?.disable();
      codeCtrl?.disable();
    }

    acceptanceCtrl?.valueChanges.subscribe(isAccepted => {
      if (isAccepted) {
        joiningDateCtrl?.enable();
        codeCtrl?.enable();
      } else {
        joiningDateCtrl?.disable();
        codeCtrl?.disable();
      }
    });
    return group;
  }

  get joiningProcessCandidates(): FormArray {
    return this.joiningProcessCandidateForm.get('joiningProcessCandidates') as FormArray;
  }

  get hasAcceptedCandidate(){
    return this.joiningProcessCandidates.controls.some(
      (c) => c.get('candidateAcceptance')?.value === true
    )
  }

  ngOnInit(): void {
    this.demandDetails = history.state;

    this.fetchViewRequisition();
    this.fetchInterviewerList();

    if (this.demandDetails.fullfillmentStatus !== FullFillmentStatus.STEP1) {     
      this.fetchViewFirstInterview();
    }

    if (this.demandDetails.fullfillmentStatus !== FullFillmentStatus.STEP2) {
      this.fetchViewAssignedCandidates();
    }

    this.stepService.activeStep$.subscribe(step => {
      this.activeStep = step;

      if (this.activeStep === 2) {
        this.fetchCandidateByCategory(this.demandDetails.categoryId);
      }
      if (this.activeStep === 4 || this.activeStep === 5) {
        this.fetchFinalInterviewDetails();
      }
      if (this.activeStep === 6) {
        this.fetchFinalApprovalCandidateList();
      }
      if (this.activeStep === 7) {
        this.fetchJoiningProcessCandidateList();
      }
    })

    const today = new Date();
    this.minDate = new Date(today);
  }

  stepChange(stepValue: any){
    this.activeStep = stepValue;
    this.fetchViewRequisition();

    if (this.activeStep === 2) {
      this.fetchCandidateByCategory(this.demandDetails.categoryId);
    }

    if (this.demandDetails.fullfillmentStatus !== FullFillmentStatus.STEP2) {
      this.fetchViewAssignedCandidates();
    }

    if (this.activeStep === 4 || this.activeStep === 5) {
      this.fetchFinalInterviewDetails();
    }

    if (this.activeStep === 6) {
      this.fetchFinalApprovalCandidateList();
    }

    if (this.activeStep === 7) {
      this.fetchJoiningProcessCandidateList();
    }
  }

  fetchViewRequisition(){
    try {
      this.fetchConsultancyByCategory(this.demandDetails.categoryId);
      if (this.activeStep === 2) {           
        this.fetchCandidateByCategory(this.demandDetails.categoryId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  fetchViewFirstInterview(){
    try {
      const data = {
        demandId: this.demandDetails.demandId
      }

      this.apiService.viewFirstInterview(data).subscribe({
        next: val => {
          const consultancyIds = val.data.demandConsultancyMap.map((c: any) => c.consultancy.userId);
          this.consultancyArray = consultancyIds;
          this.demandConsultancyControl.patchValue(consultancyIds, { emitEvent: false });
          this.demandHrControl.patchValue(consultancyIds, { emitEvent: false });

          
          const data = val.data;
          this.firstInterviewId = data.interviewId;

          if (this.demandDetails.fullfillmentStatus !== FullFillmentStatus.STEP2) {
            this.fetchViewAssignedCandidates();
          }

          const interviewDate = data.interviewDate ? new Date(data.interviewDate) : null;
          let interviewTime = null;

          if (data.interviewDate && data.interviewTime) {
            interviewTime = new Date(`${data.interviewDate}T${data.interviewTime}`);
          }
          
          this.firstInterviewScheduleForm.patchValue({
            ...data,
            interviewDate: interviewDate,
            interviewTime: interviewTime
          }, { emitEvent: false })
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

          this.apiService.assignNewConsultancy(data).subscribe({
            next: val => {
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

          this.apiService.removeAssignedConsultancy(data).subscribe({
            next: val => {
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
  }

  formatDateAndTime(form: FormGroup): {formattedDate: string | null; formattedTime: string | null }{
    const interviewDate = new Date(form.get('interviewDate')?.value ?? '');
    const interviewTime = new Date(form.get('interviewTime')?.value ?? '');

    if (interviewDate && interviewTime) {
      const formattedDate = this.datePipe.transform(interviewDate, 'yyyy-MM-dd');
      const formattedTime = this.datePipe.transform(interviewTime, 'HH:mm');

      form.patchValue({
        interviewDate: formattedDate,
        interviewTime: formattedTime
      });

      return { formattedDate, formattedTime };
    }
    return { formattedDate: null, formattedTime: null };
  }

  submitFirstInterviewSchedule(){
    try {   
      this.formatDateAndTime(this.firstInterviewScheduleForm);
      
      if (this.demandDetails.fullfillmentStatus === FullFillmentStatus.STEP1) {
        this.firstInterviewScheduleForm.patchValue({
          demand: {
            demandId: this.demandDetails.demandId
          }
        })

        const data = this.firstInterviewScheduleForm.value;
  
        this.apiService.createFirstInterview(data).subscribe({
          next: val => {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Consultancy Assigned Successfully'});
          },
          error: err => {
            console.log(err);
          }
        })
        
      } else {
        const { demand, demandConsultancyMap, ...rest } = this.firstInterviewScheduleForm.value;
        const data = {
          ...rest,
          interviewId: this.firstInterviewId
        }

        this.apiService.updateFirstInterviewDetails(data).subscribe({
          next: val => {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Interview Details Updated Successfully'});
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
  }

  fetchCandidateByCategory(categoryId: number){
    try {
      const data = {
        categoryId: categoryId
      }

      this.apiService.fetchCandidateInfoList(data).subscribe({
        next: val => {
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
    try {
      if (!this.firstInterviewId || this.firstInterviewId === 0) {
        return;
      }
      const data = {
        interviewId: this.firstInterviewId
      }

      this.apiService.viewAssignedCandidates(data).subscribe({
        next: val => {
          this.assignedCandidateList = val.data.candidateInterviewMappings;
          this.populateCandidateInterviewMappings();

          if (this.activeStep === 4 || this.activeStep === 5) {
            this.fetchFinalInterviewDetails();
          }
          
          this.candidateArray = val.data.candidateInterviewMappings.map((c: any) => c.candidate.candidateId);
          this.candidateInterviewControl.patchValue(this.candidateArray, { emitEvent: false });
          this.candidateCodeControl.patchValue(this.candidateArray, { emitEvent: false });
          this.candidateDesignationControl.patchValue(this.candidateArray, { emitEvent: false });
          this.firstInterviewRoundForm.patchValue(val.data, { emitEvent: false });
        },
        error: err => {
          console.log("ERROR", err);
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
      formArray.push(this.takeFirstInterviewRound(candidate))
    })
  }

  selectedCandidateIds(selectedIds: any){
    try {  
      if (this.demandDetails.fullfillmentStatus !== FullFillmentStatus.STEP2) {
        const newIds = selectedIds.filter((id: number) => !this.candidateArray.includes(id));
        const removeIds = this.candidateArray.filter((id: number) => !selectedIds.includes(id));
  
        if (newIds.length > 0) {
          const data = {
            interviewId: this.firstInterviewId,
            candidate: {
              candidateId: newIds[0]
            }
          }
  
          this.apiService.assignMoreCandidates(data).subscribe({
            next: val => {
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
            interviewId: this.firstInterviewId,
            candidate: {
              candidateId: removeIds[0]
            }
          }

          this.apiService.removeAssignedCandidates(data).subscribe({
            next: val => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Removed Assigned Candidates' });
              this.fetchViewAssignedCandidates();
            },
            error: err => {
              console.log(err);

              if (err.status === 400) {
                this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail });
                this.fetchViewAssignedCandidates();
              }
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
  }

  submitStep2Form(){
    try {
      const data = {
        ...this.assignCandidateFirstInterviewForm.value,
        interviewId: this.firstInterviewId
      }

      this.apiService.assignCandidatesFirstInterview(data).subscribe({
        next: val => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Candidates Assigned Successfully For First Interview'});
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

  submitStep3Form(){
    try {
      const allCandidates = this.firstInterviewRoundForm.get('candidateInterviewMappings')?.value || [];
      const changedCandidates = allCandidates.filter((_: any, i: number) => this.candidateInterviewMappings.at(i).dirty);
      
      const data = {
        interviewId: this.firstInterviewId,
        candidateInterviewMappings: changedCandidates
      }

      this.apiService.firstInterviewRoundStatus(data).subscribe({
        next: val => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'First Interview Conducted Successfully' });
          this.fetchViewAssignedCandidates();
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail });
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchFinalInterviewDetails(){
    try {
      const data = {
        demandId: this.demandDetails.demandId
      }

      this.apiService.viewFinalInterviewDetails(data).subscribe({
        next: val => {
          const data = val.data;
          this.assignedFinalInterviewCandidateList = data.candidateInterviewMappings;
          const finalList = this.assignedFinalInterviewCandidateList;
          finalList.forEach((finalItem: any) => {
            const match = this.assignedCandidateList?.find((c: any) => c.candidate.candidateId === finalItem.candidate.candidateId)
            if(match){
              finalItem.feedback = match.feedback;
            }
          })
          this.populateCandidateFinalInterviewMapping();
          this.finalInterviewId = data.interviewId;

          const interviewDate = data.interviewDate ? new Date(data.interviewDate) : null;

          let interviewTime = null;
          if(data.interviewDate && data.interviewTime){
            interviewTime = new Date(`${data.interviewDate}T${data.interviewTime}`)
          }
          
          this.finalInterviewerAssignForm.patchValue({
            ...data,
            interviewDate: interviewDate,
            interviewTime: interviewTime
          });

          this.finalInterviewRoundForm.patchValue({
            ...data,
            candidateFinalInterviewMappings: this.assignedFinalInterviewCandidateList
          });
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  submitStep4Form(){
    try {
      this.formatDateAndTime(this.finalInterviewerAssignForm);
      const data = {
        ...this.finalInterviewerAssignForm.value,
        interviewId: this.finalInterviewId,
      }

      this.apiService.updateFirstInterviewDetails(data).subscribe({
        next: val => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully Scheduled For Final Interview'});
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  populateCandidateFinalInterviewMapping(){
    const formArray = this.candidateFinalInterviewMappings;
    formArray.clear();

    this.assignedFinalInterviewCandidateList.forEach((candidate: any) => {
      formArray.push(this.takeFinalInterviewRound(candidate))
    })
  }

  submitStep5Form(){
    try {
      const allCandidates = this.finalInterviewRoundForm.get('candidateFinalInterviewMappings')?.value || [];
      const changedCandidates = allCandidates.filter((_: any, i: number) => this.candidateFinalInterviewMappings.at(i).dirty);

      const data = {
        interviewId: this.finalInterviewId,
        candidateInterviewMappings: changedCandidates
      }

      this.apiService.updateFinalInterviewRound(data).subscribe({
        next: val => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Final Interview Conducted Successfully' });
          this.fetchFinalInterviewDetails();
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

  fetchFinalApprovalCandidateList(){
    try {
      const data = {
        demandId: this.demandDetails.demandId
      }

      this.apiService.finalApprovalCandidateList(data).subscribe({
        next: val => {
          this.finalApprovalCandidateList = val?.data;
          this.populateFinalApprovalCandidateMapping();
          this.finalApprovalCandidateForm.patchValue({
            ...val.data,
            approvalCandidates: val.data
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

  populateFinalApprovalCandidateMapping(){
    const formArray = this.approvalCandidates;
    formArray.clear();

    this.finalApprovalCandidateList.forEach((candidate: any) => {
      formArray.push(this.takeFinalApproval(candidate))
    })
  }

  submitStep6Form(){
    try {
      const allCandidates = this.finalApprovalCandidateForm.get('approvalCandidates')?.value || [];
      const changedCandidates = allCandidates.filter((_: any, i: number) => this.approvalCandidates.at(i).dirty);

      const data = {
        demandId: this.demandDetails.demandId,
        approvalCandidates: changedCandidates,
      }

      this.apiService.finalApprovalRound(data).subscribe({
        next: val => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Final Approval Done Successfully' });
          this.fetchFinalApprovalCandidateList();
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchJoiningProcessCandidateList(){
    try {
      const data = {
        demandId: this.demandDetails.demandId
      }

      this.apiService.joiningProcessCandidateList(data).subscribe({
        next: val => {
          this.joiningProcessCandidateList = val.data;
          this.populateJoiningProcessCandidates();
          const processedData = val.data.map((item: any) => ({
            ...item,
            joiningDate: item.joiningDate ? new Date(item.joiningDate) : null
          }))
          this.joiningProcessCandidateForm.patchValue({
            ...val.data,
            joiningProcessCandidates: processedData
          });
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  populateJoiningProcessCandidates(){
    const formArray = this.joiningProcessCandidates;
    formArray.clear();

    this.joiningProcessCandidateList.forEach((candidate: any) => {
      formArray.push(this.takeJoiningProcess(candidate))
    })
  }

  submitStep7Form(){
    try {
      const approvalCandidates = this.joiningProcessCandidates.controls
        .filter((control: any) => control.dirty)
        .map((control: any) => {
        const candidate = { ...control.value };

        if (!candidate.candidateAcceptance) {
          delete candidate.joiningDate;
        }

        return candidate;
      });

      if (!approvalCandidates.length) {
        this.messageService.add({severity: 'info', summary: 'No Changes', detail: 'No candidate data was modified'});
        return;
      }

      const data = {
        demandId: this.demandDetails.demandId,
        approvalCandidates: approvalCandidates
      }

      this.apiService.joiningProcessCandidatesForm(data).subscribe({
        next: val => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Joining Process Done Successfully'});
          this.fetchJoiningProcessCandidateList();
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
