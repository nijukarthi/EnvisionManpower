import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cost-plus-candidate-form',
  imports: [Shared],
  templateUrl: './cost-plus-candidate-form.html',
  styleUrl: './cost-plus-candidate-form.scss'
})
export class CostPlusCandidateForm implements OnInit {
  private fb = inject(FormBuilder);

  pCodeList: any;
  projectDetails: any;
  spnInfoList: any;
  envisionRoleList: any;
  selectedSpn: any;

  actionName = 'Submit';

  candidateId = 0;

  constructor(private apiService: Apiservice, private messageService: MessageService, private router: Router, private route: ActivatedRoute){}

  costPlusCandidateForm = this.fb.group({
    candidateName: [''],
    positionApplied: [''],
    currentExperience: [0],
    totalExperience: [0],
    highestQualification: [''],
    qualification: [''],
    noticePeriod: [0],
    workingCurrently: [false],
    monthlyReimbursements: this.fb.group({
      grossCTC: [0],
      margin: [{ value: 0, disabled: true }],
      laptop: [0],
      total: [{ value: 0, disabled: true }],
      gst: [{ value: 0, disabled: true }],
      grandTotal: [{ value: 0, disabled: true }]
    }),
    oneTimeReimbursements: this.fb.group({
      oneTimeSourcingFee: [0],
      bgvCost: [0],
      total: [{ value: 0, disabled: true }],
      gst: [{ value: 0, disabled: true }],
      grandTotal: [{ value: 0, disabled: true }]
    }),
    employmentDetails: this.fb.group({
      project: this.fb.group({
        projectId: [0]
      }),
      spn: this.fb.group({
        spnId: [0]
      }),
      envisionRole: this.fb.group({
        id: [0]
      }),
      offerReleaseDate: [''],
      joiningDate: ['']
    }),
    costPlusSalaryDetails: this.fb.group({
      currentSalaryNet: [0],
      expectedSalaryNet: [0],
      approvedHike: [0],
      approvedFixedSalary: [{ value: 0, disabled: true }],
      tenPercentVariable: [{ value: 0, disabled: true }],
      totalFixedVariable: [{ value: 0, disabled: true }],
      finalHikeFromCurrent: [{ value: 0, disabled: true }],
      deltaFromExpected: [{ value: 0, disabled: true }]
    })
  })

  ngOnInit(): void {
    const form = this.costPlusCandidateForm;

    form.get('monthlyReimbursements.grossCTC')?.valueChanges.subscribe(() => this.updateMonthlyTotal());
    form.get('monthlyReimbursements.laptop')?.valueChanges.subscribe(() => this.updateMonthlyTotal());

    form.get('oneTimeReimbursements.oneTimeSourcingFee')?.valueChanges.subscribe(() => this.updateOneTimeTotal());
    form.get('oneTimeReimbursements.bgvCost')?.valueChanges.subscribe(() => this.updateOneTimeTotal());

    form.get('costPlusSalaryDetails.currentSalaryNet')?.valueChanges.subscribe(() => this.calculateSalaryDetails());
    form.get('costPlusSalaryDetails.expectedSalaryNet')?.valueChanges.subscribe(() => this.calculateSalaryDetails());
    form.get('costPlusSalaryDetails.approvedHike')?.valueChanges.subscribe(() => this.calculateSalaryDetails());

    this.fetchPCodes();
    this.fetchSpnInfo();
    this.fetchEnvisionRoles();

    this.route.paramMap.subscribe(param => {
      const id = param.get('id');
      console.log(id);

      if (id) {
        this.candidateId = Number(id);
        this.actionName = 'Update';
        this.fetchViewCandidate(this.candidateId);
      }
    })
  }

  fetchViewCandidate(candidateId: number){
    try {
      const data = {
        candidateId: candidateId
      }

      this.apiService.fetchViewCandidate(data).subscribe({
        next: val => {
          console.log(val);
          this.costPlusCandidateForm.patchValue(val.data);
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  updateMonthlyTotal(){
    const grossCTC = this.costPlusCandidateForm.get('monthlyReimbursements.grossCTC')?.value || 0;
    const laptop = this.costPlusCandidateForm.get('monthlyReimbursements.laptop')?.value || 0;

    const margin = grossCTC * 0.06;
    this.costPlusCandidateForm.get('monthlyReimbursements.margin')?.setValue(margin, { emitEvent: false });

    const total = grossCTC + margin + laptop;
    this.costPlusCandidateForm.get('monthlyReimbursements.total')?.setValue(total, { emitEvent: false });

    const gst = total * 0.18;
    this.costPlusCandidateForm.get('monthlyReimbursements.gst')?.setValue(gst, { emitEvent: false });

    const grandTotal = total + gst;
    this.costPlusCandidateForm.get('monthlyReimbursements.grandTotal')?.setValue(grandTotal, { emitEvent: false });
  }

  updateOneTimeTotal(){
    const oneTimeSourcingFee = this.costPlusCandidateForm.get('oneTimeReimbursements.oneTimeSourcingFee')?.value || 0;
    const bgvCost = this.costPlusCandidateForm.get('oneTimeReimbursements.bgvCost')?.value || 0;

    const total = oneTimeSourcingFee + bgvCost;
    this.costPlusCandidateForm.get('oneTimeReimbursements.total')?.setValue(total, { emitEvent: false });
    const gst = total * 0.18;
    this.costPlusCandidateForm.get('oneTimeReimbursements.gst')?.setValue(gst, { emitEvent: false });
    const grandTotal = total + gst;
    this.costPlusCandidateForm.get('oneTimeReimbursements.grandTotal')?.setValue(grandTotal, { emitEvent: false });
  }

  calculateSalaryDetails(){
    const currentSalaryNet = this.costPlusCandidateForm.get('costPlusSalaryDetails.currentSalaryNet')?.value || 0;
    const expectedSalaryNet = this.costPlusCandidateForm.get('costPlusSalaryDetails.expectedSalaryNet')?.value || 0;
    const approvedHike = this.costPlusCandidateForm.get('costPlusSalaryDetails.approvedHike')?.value || 0;

    const approvedHikePercent = approvedHike / 100;

    const approvedFixedSalary = currentSalaryNet * (1 + approvedHikePercent);
    this.costPlusCandidateForm.get('costPlusSalaryDetails.approvedFixedSalary')?.setValue(approvedFixedSalary, { emitEvent: false });

    const tenPercentVariable = approvedFixedSalary * 0.1;
    this.costPlusCandidateForm.get('costPlusSalaryDetails.tenPercentVariable')?.setValue(tenPercentVariable, { emitEvent: false });

    const totalFixedVariable = approvedFixedSalary + tenPercentVariable;
    this.costPlusCandidateForm.get('costPlusSalaryDetails.totalFixedVariable')?.setValue(totalFixedVariable, { emitEvent: false });

    const finalHikeFromCurrent = (totalFixedVariable - currentSalaryNet) / currentSalaryNet;
    const finalHikeFromCurrentPercent = finalHikeFromCurrent * 100;
    this.costPlusCandidateForm.get('costPlusSalaryDetails.finalHikeFromCurrent')?.setValue(finalHikeFromCurrentPercent, { emitEvent: false });

    const deltaFromExpected = totalFixedVariable - expectedSalaryNet;
    this.costPlusCandidateForm.get('costPlusSalaryDetails.deltaFromExpected')?.setValue(deltaFromExpected, { emitEvent: false });
  }

  fetchPCodes(){
    try {
      this.apiService.fetchProjectCodes('').subscribe({
        next: val => {
          console.log(val);
          this.pCodeList = val?.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  selectedPCode(projectId: any){
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

  fetchSpnInfo(){
    try {
      this.apiService.fetchSpnInfo('').subscribe({
        next: val => {
          console.log(val);
          this.spnInfoList = val?.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  selectedSpnId(spnId: number){
    this.selectedSpn = this.spnInfoList.find((spn: any) => spn.spnId === spnId);

    const spnGroup = this.costPlusCandidateForm.get('employmentDetails.spn');
    spnGroup?.patchValue({
      spnId: spnId
    })
  }

  fetchEnvisionRoles(){
    try {
      this.apiService.fetchActiveEnvRole('').subscribe({
        next: val => {
          console.log(val);
          this.envisionRoleList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  

  costPlusCandidateApi(data: any){
    try {
      this.apiService.createCostPlusCandidates(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Candidate Created Successfully'});
          setTimeout(() => {
            this.router.navigate(['/home/candidate/cost-plus']);
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

  onSubmit(){
    console.log(this.costPlusCandidateForm.getRawValue());

    const { employmentDetails, costPlusSalaryDetails, ...data} = this.costPlusCandidateForm.getRawValue();
    console.log('Final data to send:', data);
    
    this.costPlusCandidateApi(data);
  }

  submitEmploymentDetails(){
    console.log(this.costPlusCandidateForm.getRawValue());
    const data = this.costPlusCandidateForm.getRawValue();

    this.costPlusCandidateApi(data);
  }
}
