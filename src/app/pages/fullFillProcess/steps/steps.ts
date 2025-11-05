import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  private fb = inject(FormBuilder);

  consultancyList: any;
  demandDetails: any;
  selectedConsultancy: any;
  interviewerList: any;

  candidateList = [
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

  constructor(private apiService: Apiservice, private router: Router){}

  ngOnInit(): void {
    this.demandDetails = history.state;

    console.log('Received Requisition ID:', this.demandDetails);
    this.fetchViewRequisition();
    this.fetchInterviewerList();
  }

  fetchViewRequisition(){
    try {
      const data = {
        requesitionId: this.demandDetails.requesitionId
      }

      this.apiService.viewRequisition(data).subscribe({
        next: val => {
          console.log(val);
          this.fetchConsultancyByCategory(val.data.category.categoryId)
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
    
    const demandConsultancyArray = this.demandConsultancyMap;
    demandConsultancyArray.clear();

    userIds.forEach((id: any) => {
      demandConsultancyArray.push(this.assignConsultancy(id))
    })

    this.demandHrControl.setValue(userIds);

    console.log(this.firstInterviewScheduleForm.value);
  }

  formatDateAndTime(){
    const interviewDate = new Date(this.firstInterviewScheduleForm.get('interviewDate')?.value ?? '');
    const interviewTime = new Date(this.firstInterviewScheduleForm.get('interviewTime')?.value ?? '');

    if (interviewDate && interviewTime) {
      const formattedDate = interviewDate.toISOString().split('T')[0];

      const hours = interviewTime.getHours().toString().padStart(2, '0');
      const minutes = interviewTime.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;

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
      this.firstInterviewScheduleForm.patchValue({
        demand: {
          demandId: this.demandDetails.demandId
        }
      })

      this.formatDateAndTime();
      console.log(this.firstInterviewScheduleForm.value);

      const data = this.firstInterviewScheduleForm.value;

      this.apiService.createFirstInterview(data).subscribe({
        next: val => {
          console.log(val);
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
