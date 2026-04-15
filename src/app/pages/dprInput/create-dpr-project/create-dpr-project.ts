import { FormFieldError } from '@/directives/form-field-error';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-dpr-project',
  imports: [Shared, FormFieldError],
  templateUrl: './create-dpr-project.html',
  styleUrl: './create-dpr-project.scss'
})
export class CreateDprProject implements OnInit {
  dprProjectId = 0;

  clusterList: any;
  customerList: any;
  projCodeList: any;
  projManagerList: any;
  dprDetails: any;

  private fb = inject(FormBuilder);

  constructor(private apiService: Apiservice, private messageService: MessageService, private router: Router, 
    private route: ActivatedRoute){}

  dprProjectForm = this.fb.group({
    dprProjectDetailsId: [0],
    projectCode: ['', Validators.required],
    projectDescription: [''],
    customerId: ['', Validators.required],
    clusterName: ['', Validators.required],
    zone: ['', Validators.required],
    projectQty: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
    craneCount: [0],
    probability: [0],
    projectTerm: [0],
    ppaType: [0],
    projectManager: [null, Validators.required],
    contractStatus: [''],
    siteStatus: ['']
  })

  get projectCode(){
    return this.dprProjectForm.get('projectCode');
  }

  get customerId(){
    return this.dprProjectForm.get('customerId');
  }

  get clusterName(){
    return this.dprProjectForm.get('clusterName');
  }

  get zone(){
    return this.dprProjectForm.get('zone');
  }

  get projectQty(){
    return this.dprProjectForm.get('projectQty');
  }

  get projectManager(){
    return this.dprProjectForm.get('projectManager');
  }

  ngOnInit(): void {
    this.dprDetails = history.state;

    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');

      if (id) {
        this.dprProjectId = Number(id);
        this.dprProjectForm.patchValue(this.dprDetails.dprProjectDetails);
        this.dprProjectForm.get('projectQty')?.disable();
      } else {
        this.dprProjectForm.get('projectQty')?.enable();
      }
    })

    this.fetchAllCluster();
    this.fetchCustomerList();
    this.fetchProjCodes();
    this.fetchProjManager();
  }

  fetchAllCluster(){
    try {
      this.apiService.getActiveClusters('').subscribe({
        next: val => {
          this.clusterList = val.data;
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

  fetchCustomerList(){
    try {
      this.apiService.fetchCustomerList().subscribe({
        next: val => {
          this.customerList = val?.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchProjCodes(){
    try {
      this.apiService.fetchProjectCodes('').subscribe({
        next: val => {
          this.projCodeList = val?.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchProjManager(){
    try {
      const data = {
        userGroupId: UserGroups.PROJECTMANAGER
      }

      this.apiService.findUserGroup(data).subscribe({
        next: val => {
          this.projManagerList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  submitDprProject(){
    try {
      if (!this.dprProjectId) {     
        const data = this.dprProjectForm.value;
  
        this.apiService.addDPRProjectDetails(data).subscribe({
          next: val => {
            this.dprProjectForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'DPR Project Details Created Successfully' });
            setTimeout(() => {
              this.router.navigate(['/home/dpr-project-details']);     
            }, 2000);
          },
          error: err => {
            console.log(err);
  
            if (err.status === 400) {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
            }
          }
        })
      } else {
        const data = this.dprProjectForm.value;

        this.apiService.updateDprProject(data).subscribe({
          next: val => {
            this.dprProjectForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'DPR Project Details Updated Successfully' });
            setTimeout(() => { 
              this.router.navigate(['/home/dpr-project-details']);
            }, 2000);
          },
          error: err => {
            console.log(err);

            if (err.status === 400) {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
            }
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  probabilityList = [
    {
      label: 'P-50',
      value: 30
    },
    {
      label: 'P-75',
      value: 31
    },
    {
      label: 'P-90',
      value: 32
    },
    {
      label: 'P-100',
      value: 33
    }
  ]

  termList = [
    {
      label: 'DAP',
      value: 20
    },
    {
      label: 'DAP + Tower',
      value: 21
    },
    {
      label: 'EXW',
      value: 22
    },
    {
      label: 'EXW + Tower',
      value: 23
    }
  ]

  ppaTypeList = [
    {
      label: 'BID',
      value: 40
    },
    {
      label: 'C&I',
      value: 41
    },
    {
      label: 'TBD',
      value: 42
    },
    {
      label: 'TBC',
      value: 43
    }
  ]

  contractStatusList = [
    {
      label: 'Contract',
      value: 'Contract'
    },
    {
      label: 'Advance Stage of Closure',
      value: 'Advance Stage of Closure'
    },
    {
      label: 'Framework Agreement Signed',
      value: 'Framework Agreement Signed'
    },
    {
      label: 'Term sheet signed',
      value: 'Term sheet signed'
    },
    {
      label: 'Under Discussion',
      value: 'Under Discussion'
    }
  ]

  siteStatusList = [
    {
      label: 'Active',
      value: 'Active'
    },
    {
      label: 'Inactive',
      value: 'Inactive'
    },
    {
      label: 'OMS',
      value: 'OMS'
    }
  ]

  zoneList = [
    {
      label: 'North',
      value: 'NORTH'
    },
    {
      label: 'South',
      value: 'SOUTH'
    },
    {
      label: 'East',
      value: 'EAST'
    },
    {
      label: 'West',
      value: 'WEST'
    }
  ];
}
