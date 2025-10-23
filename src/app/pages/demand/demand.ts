import { Component, inject, OnInit } from '@angular/core';
import { Shared } from '@/service/shared';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  departmentList:any;
  PCodeList: any;
  clusterList: any;
  categoryList: any;
  clusterHeadList: any;
  siteInchargeList: any;
  departmentHeadList: any;
  spnInfoList: any;

  loading = false;

  private fb = inject(FormBuilder);

  userGroups = UserGroups;

  requestedBy = sessionStorage.getItem('userName');

  selectedState:any = "";

  constructor(private apiService: Apiservice, private messageService: MessageService) {}

  demandForm = this.fb.group({
    projectId: [null, Validators.required],
    cluster: this.fb.group({
      clusterId: [{ value: 0, disabled: true }]
    }),
    clusterHead: this.fb.group({
      userId: [{ value: 0, disabled: true }]
    }),
    siteIncharge: this.fb.group({
      userId: [{ value: 0, disabled: true }]
    }),
    departmentHead: this.fb.group({
      userId: [{ value: 0, disabled: true }]
    }),
    category: this.fb.group({
      categoryId: [0]
    }),
    department: this.fb.group({
      departmentId: [{ value: 0, disabled: true }]
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
      plannedReleaseDate: ['', Validators.required],
      plannedDeploymentDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchActiveDepartments();
    this.fetchPCodes();
    this.fetchActiveClusters();
    this.fetchActiveCategory();
    this.findUserGroup(UserGroups.SITEINCHARGE, 'siteIncharge');
    this.findUserGroup(UserGroups.DEPARTMENTHEAD, 'departmentHead');
    this.fetchSpnInfo();
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
          this.fetchClusterHeadByCluster(val.data.cluster.clusterId);
          this.demandForm.patchValue({
            cluster: {
              clusterId: val.data.cluster.clusterId
            },
            clusterHead: {
              userId: val.data.clusterHead.userId
            },
            department: {
              departmentId: val.data.department.departmentId
            },
            siteIncharge: {
              userId: val.data.siteIncharge.userId
            },
            departmentHead: {
              userId: val.data.departmentHead.userId
            }
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

  fetchActiveDepartments(){
    try {    
      this.apiService.fetchActiveDepartments('').subscribe({
        next: val => {
          console.log(val);
          this.departmentList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchActiveClusters(){
    try {   
      this.apiService.getActiveClusters('').subscribe({
        next: val => {
          console.log(val);
          this.clusterList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchClusterHeadByCluster(clusterId: number){
    console.log(clusterId);
    try {
      const data = {
        clusterId: clusterId
      }
      console.log(data);
      this.apiService.fetchClusterHeadByCluster(data).subscribe({
        next: val => {
          console.log(val);
          this.clusterHeadList = val.data ? [val.data] : [];
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  findUserGroup(userGroupId: number, type: 'siteIncharge' | 'departmentHead'){
    try {
      this.loading = true;

      const data = {
        userGroupId: userGroupId
      }
      console.log(data);
      this.apiService.findUserGroup(data).subscribe({
        next: val => {
          console.log(val);
          if (type === 'siteIncharge') {
            this.siteInchargeList = val?.data;
            console.log("siteInchargeList:", this.siteInchargeList);
          } else if (type === 'departmentHead') {
            this.departmentHeadList = val?.data;
            console.log("departmentHeadList", this.departmentHeadList);
          }
          this.loading = false;
        },
        error: err => {
          console.log(err);
          this.loading = false;
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
      spn: event,
      experience: event
    })
  }

  onSubmit(): void {
    console.log(this.demandForm.value);

    const data = {
      projectId: this.demandForm.get('projectId')?.value,
      cluster: {
        clusterId: this.demandForm.get('cluster.clusterId')?.value
      },
      clusterHead: {
        userId: this.demandForm.get('clusterHead.userId')?.value
      },
      siteIncharge: {
        userId: this.demandForm.get('siteIncharge.userId')?.value
      },
      departmentHead: {
        userId: this.demandForm.get('departmentHead.userId')?.value
      },
      category: {
        categoryId: this.demandForm.get('category.categoryId')?.value
      },
      department: {
        departmentId: this.demandForm.get('department.departmentId')?.value
      },
      demandDetails: this.demandForm.get('demandDetails')?.value
    };

    console.log(data);

    this.apiService.createRequesition(data).subscribe({
      next: val => {
        console.log(val);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Demand Request Created Successfully'});
        this.demandForm.reset();
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
