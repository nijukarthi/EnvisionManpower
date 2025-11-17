import { Component, inject, OnInit } from '@angular/core';
import { Shared } from '@/service/shared';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Apiservice } from '@/service/apiservice/apiservice';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-demand',
  imports: [Shared],
  templateUrl: './demand.html',
  styleUrl: './demand.scss'
})
export class Demand implements OnInit {

  selectedPCodes:any = "";
  PCodeList: any;
  categoryList: any;
  spnInfoList: any;
  projectDetails: any;

  minDate: Date | undefined;
  releaseMinDate: Date | undefined;

  loading = false;

  private fb = inject(FormBuilder);

  userGroups = UserGroups;

  requestedBy = sessionStorage.getItem('userName');

  selectedState:any = "";

  constructor(private apiService: Apiservice, private messageService: MessageService) {}

  demandForm = this.fb.group({
    project: this.fb.group({
      projectId: [null, Validators.required],
    }),
    category: this.fb.group({
      categoryId: [0]
    }),
    demandDetails: this.fb.array([this.createDemandDetails()]),
  });

  createDemandDetails() {
    return this.fb.group({
      spn: this.fb.group({
        spnId: ['', Validators.required]
      }),
      spnDescription: ['', Validators.required],
      experience: [{ value: '', disabled: true }, Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      plannedDeploymentDate: ['', Validators.required],
      plannedReleaseDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchPCodes();
    this.fetchActiveCategory();
    this.fetchSpnInfo();

    const today = new Date();
    this.minDate = new Date(today.setDate(today.getDate() + 30));
  }

  get demandDetails(): FormArray {
    return this.demandForm.get('demandDetails') as FormArray;
  }

  selectedPCode(projectId: number){
    try {   
      console.log(projectId);
  
      const data = {
        projectId: projectId
      }
  
      this.apiService.viewProject(data).subscribe({
        next: val => {
          console.log(val);
          this.projectDetails = val.data;     
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchPCodes(){
    try {   
      this.apiService.fetchProjectCodes('').subscribe({
        next: val => {
          console.log(val);
          this.PCodeList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }


  fetchActiveCategory(){
    try { 
      this.apiService.fetchActiveCategory('').subscribe({
        next: val => {
          console.log(val);
          this.categoryList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchSpnInfo(){
    try {
      this.apiService.fetchSpnInfo('').subscribe({
        next: val => {
          console.log("Spn Info", val);
          this.spnInfoList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  addSpnRow(): void {
    const spnGroup = this.fb.group({
      spn: this.fb.group({
        spnId: ['', Validators.required]
      }),
      spnDescription: ['', Validators.required],
      experience: [{ value: '', disabled: true }, Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      plannedReleaseDate: ['', Validators.required],
      plannedDeploymentDate: ['', Validators.required],
    });
    this.demandDetails.push(spnGroup);
  }

  deleteSpnRow(index: number): void {
    this.demandDetails.removeAt(index);
  }

  selectedSpnCode(event: any, rowIndex: number){
    console.log(event);

    this.demandDetails.at(rowIndex).patchValue({
      spnDescription: event,
      experience: event
    })
  }

  selectedSpnDescription(event: any, rowIndex: number){
    console.log(event);

    this.demandDetails.at(rowIndex).patchValue({
      spn: {
        spnId: event
      },
      experience: event
    })
  }

  selectedDeploymentDate(deploymentDate: any){
    console.log(deploymentDate);

    const releaseStart = new Date(deploymentDate);
    releaseStart.setDate(releaseStart.getDate() + 7);
    this.releaseMinDate = releaseStart;
  }

  onSubmit(): void {
    console.log(this.demandForm.value);

    const data = {
      project: {
        projectId: this.demandForm.get('project.projectId')?.value
      },
      category: {
        categoryId: this.demandForm.get('category.categoryId')?.value
      },
      demandDetails: this.demandForm.get('demandDetails')?.value
    };

    console.log(data);

    this.apiService.createRequesition(data).subscribe({
      next: val => {
        console.log(val);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Demand Request Created Successfully'});
        this.demandForm.reset();
        this.demandDetails.clear();
        this.projectDetails = null;
        this.addSpnRow();
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
