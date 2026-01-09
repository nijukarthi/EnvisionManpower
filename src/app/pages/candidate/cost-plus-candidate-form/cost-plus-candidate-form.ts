import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormFieldError } from '@/directives/form-field-error';

@Component({
    selector: 'app-cost-plus-candidate-form',
    imports: [Shared, FormFieldError],
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

    constructor(
        private apiService: Apiservice,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    costPlusCandidateForm = this.fb.group({
        candidateId: [0],
        candidateName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        positionApplied: ['', [Validators.minLength(3), Validators.maxLength(100)]],
        currentExperience: [null],
        totalExperience: [null],
        highestQualification: ['', [Validators.minLength(3), Validators.maxLength(80)]],
        qualification: ['', [Validators.minLength(3), Validators.maxLength(80)]],
        noticePeriod: [null, Validators.pattern(/^\d{2,3}$/)],
        monthlyReimbursements: this.fb.group({
            grossCTC: [null],
            margin: [{ value: 0, disabled: true }],
            laptop: [null],
            total: [{ value: 0, disabled: true }],
            gst: [{ value: 0, disabled: true }],
            grandTotal: [{ value: 0, disabled: true }]
        }),
        oneTimeReimbursements: this.fb.group({
            oneTimeSourcingFee: [null],
            bgvCost: [null],
            total: [{ value: 0, disabled: true }],
            gst: [{ value: 0, disabled: true }],
            grandTotal: [{ value: 0, disabled: true }]
        })
    });

    get candidateName() {
        return this.costPlusCandidateForm.get('candidateName');
    }

    get phoneNumber() {
        return this.costPlusCandidateForm.get('phoneNumber');
    }

    get positionApplied() {
        return this.costPlusCandidateForm.get('positionApplied');
    }

    get currentExperience() {
        return this.costPlusCandidateForm.get('currentExperience');
    }

    get totalExperience() {
        return this.costPlusCandidateForm.get('totalExperience');
    }

    get highestQualification() {
        return this.costPlusCandidateForm.get('highestQualification');
    }

    get qualification() {
        return this.costPlusCandidateForm.get('qualification');
    }

    get noticePeriod() {
        return this.costPlusCandidateForm.get('noticePeriod');
    }

    // workingCurrently: [false],
    // employmentDetails: this.fb.group({
    //     project: this.fb.group({
    //       projectId: [0]
    //     }),
    //     spn: this.fb.group({
    //       spnId: [0]
    //     }),
    //     envisionRole: this.fb.group({
    //       id: [0]
    //     }),
    //     offerReleaseDate: [''],
    //     joiningDate: ['']
    //   }),
    //   costPlusSalaryDetails: this.fb.group({
    //     currentSalaryNet: [0],
    //     expectedSalaryNet: [0],
    //     approvedHike: [0],
    //     approvedFixedSalary: [{ value: 0, disabled: true }],
    //     tenPercentVariable: [{ value: 0, disabled: true }],
    //     totalFixedVariable: [{ value: 0, disabled: true }],
    //     finalHikeFromCurrent: [{ value: 0, disabled: true }],
    //     deltaFromExpected: [{ value: 0, disabled: true }]
    //   })

    ngOnInit(): void {
        const form = this.costPlusCandidateForm;

        form.get('monthlyReimbursements.grossCTC')?.valueChanges.subscribe(() => this.updateMonthlyTotal());
        form.get('monthlyReimbursements.laptop')?.valueChanges.subscribe(() => this.updateMonthlyTotal());

        form.get('oneTimeReimbursements.oneTimeSourcingFee')?.valueChanges.subscribe(() => this.updateOneTimeTotal());
        form.get('oneTimeReimbursements.bgvCost')?.valueChanges.subscribe(() => this.updateOneTimeTotal());

        // form.get('costPlusSalaryDetails.currentSalaryNet')?.valueChanges.subscribe(() => this.calculateSalaryDetails());
        // form.get('costPlusSalaryDetails.expectedSalaryNet')?.valueChanges.subscribe(() => this.calculateSalaryDetails());
        // form.get('costPlusSalaryDetails.approvedHike')?.valueChanges.subscribe(() => this.calculateSalaryDetails());

        this.fetchEnvisionRolesInfoList();

        this.route.paramMap.subscribe((param) => {
            const id = param.get('id');
            console.log(id);

            if (id) {
                this.candidateId = Number(id);
                this.actionName = 'Update';
                this.fetchViewCandidate(this.candidateId);
            }
        });
    }

    fetchViewCandidate(candidateId: number) {
        try {
            const data = {
                candidateId: candidateId
            };

            this.apiService.fetchViewCandidate(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.costPlusCandidateForm.patchValue(val.data);
                },
                error: (err) => {
                    console.log(err);

                    if (err.status === 400) {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail }); 
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateMonthlyTotal() {
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

    updateOneTimeTotal() {
        const oneTimeSourcingFee = this.costPlusCandidateForm.get('oneTimeReimbursements.oneTimeSourcingFee')?.value || 0;
        const bgvCost = this.costPlusCandidateForm.get('oneTimeReimbursements.bgvCost')?.value || 0;

        const total = oneTimeSourcingFee + bgvCost;
        this.costPlusCandidateForm.get('oneTimeReimbursements.total')?.setValue(total, { emitEvent: false });
        const gst = total * 0.18;
        this.costPlusCandidateForm.get('oneTimeReimbursements.gst')?.setValue(gst, { emitEvent: false });
        const grandTotal = total + gst;
        this.costPlusCandidateForm.get('oneTimeReimbursements.grandTotal')?.setValue(grandTotal, { emitEvent: false });
    }

    // calculateSalaryDetails(){
    //   const currentSalaryNet = this.costPlusCandidateForm.get('costPlusSalaryDetails.currentSalaryNet')?.value || 0;
    //   const expectedSalaryNet = this.costPlusCandidateForm.get('costPlusSalaryDetails.expectedSalaryNet')?.value || 0;
    //   const approvedHike = this.costPlusCandidateForm.get('costPlusSalaryDetails.approvedHike')?.value || 0;

    //   const approvedHikePercent = approvedHike / 100;

    //   const approvedFixedSalary = currentSalaryNet * (1 + approvedHikePercent);
    //   this.costPlusCandidateForm.get('costPlusSalaryDetails.approvedFixedSalary')?.setValue(approvedFixedSalary, { emitEvent: false });

    //   const tenPercentVariable = approvedFixedSalary * 0.1;
    //   this.costPlusCandidateForm.get('costPlusSalaryDetails.tenPercentVariable')?.setValue(tenPercentVariable, { emitEvent: false });

    //   const totalFixedVariable = approvedFixedSalary + tenPercentVariable;
    //   this.costPlusCandidateForm.get('costPlusSalaryDetails.totalFixedVariable')?.setValue(totalFixedVariable, { emitEvent: false });

    //   const finalHikeFromCurrent = (totalFixedVariable - currentSalaryNet) / currentSalaryNet;
    //   const finalHikeFromCurrentPercent = finalHikeFromCurrent * 100;
    //   this.costPlusCandidateForm.get('costPlusSalaryDetails.finalHikeFromCurrent')?.setValue(finalHikeFromCurrentPercent, { emitEvent: false });

    //   const deltaFromExpected = totalFixedVariable - expectedSalaryNet;
    //   this.costPlusCandidateForm.get('costPlusSalaryDetails.deltaFromExpected')?.setValue(deltaFromExpected, { emitEvent: false });
    // }

    updatePersonalDetails() {
        try {
            const { monthlyReimbursements, oneTimeReimbursements, ...data } = this.costPlusCandidateForm.value;
            console.log(data);
            this.apiService.updateCostPlusPersonalCandidate(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Candidate Personal Detials Updated Successfully' });
                    this.fetchViewCandidate(this.candidateId);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateMonthlyReimbursements() {
        try {
            let data = this.costPlusCandidateForm.get('monthlyReimbursements')?.getRawValue();

            data = {
                candidateId: this.candidateId,
                ...data
            };
            console.log(data);

            this.apiService.updateMonthlyReimbursementCandidate(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Candidate Monthly Reimbursements Updated Successfully' });
                    this.fetchViewCandidate(this.candidateId);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    selectedPCode(projectId: any) {
        try {
            console.log(projectId);

            const data = {
                projectId: projectId
            };

            this.apiService.viewProject(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.projectDetails = val.data;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    // selectedSpnId(spnId: number){
    //   this.selectedSpn = this.spnInfoList.find((spn: any) => spn.spnId === spnId);

    //   const spnGroup = this.costPlusCandidateForm.get('employmentDetails.spn');
    //   spnGroup?.patchValue({
    //     spnId: spnId
    //   })
    // }

    fetchEnvisionRolesInfoList() {
        try {
            this.apiService.fetchRoleInfoList('').subscribe({
                next: (val) => {
                    console.log(val);
                    this.envisionRoleList = val.data;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    costPlusCandidateApi(data: any) {
        try {
            if (!this.candidateId) {
                console.log(data);
                this.apiService.createCostPlusCandidates(data).subscribe({
                    next: (val) => {
                        console.log(val);
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Candidate Created Successfully' });
                        setTimeout(() => {
                            this.router.navigate(['/home/candidates/cost-plus']);
                        }, 2000);
                    },
                    error: (err) => {
                        console.log(err);

                        if (err.status === 400) {
                           this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail }); 
                        }
                    }
                });
            } else {
                this.apiService.updateOneTimeReimbursementCandidate(data).subscribe({
                    next: (val) => {
                        console.log(val);
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Candidate Updated Successfully' });
                        setTimeout(() => {
                            this.router.navigate(['/home/candidates/cost-plus']);
                        }, 2000);
                    },
                    error: (err) => {
                        console.log(err);

                        if (err.status === 400) {
                           this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail }); 
                        }
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    onSubmit() {
        console.log(this.costPlusCandidateForm.getRawValue());

        let data;

        if (this.candidateId) {
            data = this.costPlusCandidateForm.get('oneTimeReimbursements')?.getRawValue();

            data = {
                candidateId: this.candidateId,
                ...data
            };
            console.log(data);
            this.costPlusCandidateApi(data);
        } else {
            const data = this.costPlusCandidateForm.getRawValue();
            console.log('Final data to send:', data);
            this.costPlusCandidateApi(data);
        }
    }

    updateSalaryDetails() {
        try {
            const formValue = this.costPlusCandidateForm.get('costPlusSalaryDetails')?.getRawValue();
            const data = {
                candidateId: this.candidateId,
                ...formValue
            };
            console.log(data);

            this.apiService.updateCostPlusSalaryDetails(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Candidate Salary Details Updated Successfully' });
                    setTimeout(() => {
                        this.router.navigate(['/home/candidates/cost-plus']);
                    }, 2000);
                },
                error: (err) => {
                    console.log(err);

                    if (err.status === 400) {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail }); 
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    submitEmploymentDetails() {
        console.log(this.costPlusCandidateForm.getRawValue());
        const data = this.costPlusCandidateForm.getRawValue();

        if (this.costPlusCandidateForm.get('costPlusSalaryDetails')?.dirty) {
            this.updateSalaryDetails();
        } else {
            this.costPlusCandidateApi(data);
        }
    }
}
