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
  pcodesList: any;
  projectDetails: any;
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
      employmentId: [0],
      transferTo: this.fb.group({
        projectId: [0]
      }),
      joiningDate: ['']
    })
  }

  ngOnInit(): void {
    this.fetchProjectCodes();

    this.employeeDetails = history.state;
    console.log(this.employeeDetails);
  }

  fetchProjectCodes(){
    this.apiService.fetchProjectCodes('').subscribe({
      next: val => {
        console.log(val);
        this.pcodesList = val.data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  selectedPCode(projectId: number){
    const data = {
      projectId: projectId
    }
    console.log(data);

    this.apiService.viewProject(data).subscribe({
      next: val => {
        console.log(val);
        this.projectDetails = val.data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  onSubmit(){
    try {
      console.log(this.transferForm.value);
      this.transferDetails.at(0).patchValue({
        ...this.transferDetails.value,
        employmentId: this.employeeDetails.employeeDetails.employmentId
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
