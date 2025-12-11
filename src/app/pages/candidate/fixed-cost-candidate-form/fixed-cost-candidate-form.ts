import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormFieldError } from '@/directives/form-field-error';

@Component({
    selector: 'app-candidate-form',
    imports: [Shared, FormFieldError],
    templateUrl: './fixed-cost-candidate-form.html',
    styleUrl: './fixed-cost-candidate-form.scss'
})
export class FixedCostCandidateForm implements OnInit {
    pCodeList: any;
    envisionRoleList: any;
    spnInfoList: any;
    projectDetails: any;
    selectedSpn: any;
    employmentStatusList: any;

    candidateId = 0;
    employmentId = 0;

    loggedUserGroupId = Number(sessionStorage.getItem('userGroupId'));

    actionName = 'Submit';

    private fb = inject(FormBuilder);

    fixedCostCandidateForm = this.fb.group({
        candidateId: [0],
        candidateName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        positionApplied: ['', [Validators.minLength(3), Validators.maxLength(100)]],
        currentExperience: [0],
        totalExperience: [0],
        highestQualification: ['', [Validators.minLength(3), Validators.maxLength(80)]],
        qualification: ['', [Validators.minLength(3), Validators.maxLength(80)]],
        noticePeriod: ['', [Validators.minLength(3), Validators.maxLength(3)]]
    });

    get candidateName() {
        return this.fixedCostCandidateForm.get('candidateName');
    }

    get phoneNumber() {
        return this.fixedCostCandidateForm.get('phoneNumber');
    }

    get positionApplied() {
        return this.fixedCostCandidateForm.get('positionApplied');
    }

    get currentExperience() {
        return this.fixedCostCandidateForm.get('currentExperience');
    }

    get totalExperience() {
        return this.fixedCostCandidateForm.get('totalExperience');
    }

    get highestQualification() {
        return this.fixedCostCandidateForm.get('highestQualification');
    }

    get qualification() {
        return this.fixedCostCandidateForm.get('qualification');
    }

    get noticePeriod() {
        return this.fixedCostCandidateForm.get('noticePeriod');
    }

    //   workingCurrently: [false],
    // employmentDetails: this.fb.group({
    //   project: this.fb.group({
    //     projectId: [0]
    //   }),
    //   spn: this.fb.group({
    //     spnId: [0]
    //   }),
    //   envisionRole: this.fb.group({
    //     id: [0]
    //   }),
    //   joiningDate: [''],
    //   offerReleaseDate: [''],
    //   employmentStatus: ['ACTIVE']
    // })

    constructor(
        private apiService: Apiservice,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.fetchEnvisionRolesInfoList();
        this.fetchSpnInfo();
        this.fetchEmploymentStatus();

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

    fixedCostCandidateApi(data: any) {
        try {
            if (!this.candidateId) {
                this.apiService.createFixedCostCandidate(data).subscribe({
                    next: (val) => {
                        console.log(val);
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Candidate Created Successfully' });
                        setTimeout(() => {
                            this.router.navigate(['/home/candidate/fixed-cost']);
                        }, 2000);
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
            } else {
                this.apiService.updateFixedCostCandidate(data).subscribe({
                    next: (val) => {
                        console.log(val);
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Candidate Updated Successfully' });
                        setTimeout(() => {
                            this.router.navigate(['/home/candidate/fixed-cost']);
                        }, 2000);
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    onSubmit() {
        console.log(this.fixedCostCandidateForm.value);

        let data = this.fixedCostCandidateForm.value;
        console.log('Final data to send:', data);

        if (this.candidateId) {
            data = {
                ...data,
                candidateId: this.candidateId
            };
        }
        this.fixedCostCandidateApi(data);
    }

    fetchViewCandidate(candidateId: number) {
        try {
            const data = {
                candidateId: candidateId
            };
            this.apiService.fetchViewCandidate(data).subscribe({
                next: (val) => {
                    console.log(val);
                    const candidateData = val.data;

                    const formattedData = {
                        ...candidateData,
                        employmentDetails: {
                            ...candidateData.employmentDetails,
                            offerReleaseDate: candidateData?.employmentDetails?.offerReleaseDate ? new Date(candidateData.employmentDetails.offerReleaseDate) : null,
                            joiningDate: candidateData?.employmentDetails?.joiningDate ? new Date(candidateData.employmentDetails.joiningDate) : null
                        }
                    };
                    this.fixedCostCandidateForm.patchValue(formattedData);
                    this.employmentId = candidateData?.employmentDetails?.employmentId;

                    if (candidateId && this.loggedUserGroupId === 360) {
                        this.fixedCostCandidateForm.get('employmentDetails.project.projectId')?.disable();
                        this.fixedCostCandidateForm.get('employmentDetails.spn.spnId')?.disable();
                        this.fixedCostCandidateForm.get('employmentDetails.envisionRole.id')?.disable();
                        this.fixedCostCandidateForm.get('employmentDetails.joiningDate')?.disable();
                        this.fixedCostCandidateForm.get('employmentDetails.offerReleaseDate')?.disable();
                        this.fixedCostCandidateForm.get('employmentDetails.employmentStatus')?.disable();
                    } else if (candidateId && (UserGroups.SITEINCHARGE === this.loggedUserGroupId || UserGroups.ADMIN === this.loggedUserGroupId)) {
                        this.fixedCostCandidateForm.get('employmentDetails.employmentStatus')?.enable();
                    } else {
                        this.fixedCostCandidateForm.get('employmentDetails.project.projectId')?.enable();
                        this.fixedCostCandidateForm.get('employmentDetails.spn.spnId')?.enable();
                        this.fixedCostCandidateForm.get('employmentDetails.envisionRole.id')?.enable();
                        this.fixedCostCandidateForm.get('employmentDetails.joiningDate')?.enable();
                        this.fixedCostCandidateForm.get('employmentDetails.offerReleaseDate')?.enable();
                        this.fixedCostCandidateForm.get('employmentDetails.employmentStatus')?.enable();
                    }

                    const spnId = candidateData?.employmentDetails?.spn?.spnId;
                    if (candidateData.employmentDetails) {
                        this.projectDetails = candidateData?.employmentDetails;
                        // this.selectedSPN(spnId);
                    }
                    this.fetchEmploymentStatus();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    fetchEmploymentStatus() {
        try {
            this.apiService.fetchEmploymentStatus('').subscribe({
                next: (val) => {
                    console.log(val);
                    this.employmentStatusList = val.data;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

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

    fetchSpnInfo() {
        try {
            this.apiService.fetchSpnInfo('').subscribe({
                next: (val) => {
                    console.log(val);
                    this.spnInfoList = val.data;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    selectedPCode(projectId: number) {
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

    // selectedSPN(spnId: number){
    //   this.selectedSpn = this.spnInfoList.find((spn: any) => spn.spnId === spnId);
    //   console.log(this.selectedSpn);

    //   const spnGroup = this.fixedCostCandidateForm.get('employmentDetails.spn');
    //   spnGroup?.patchValue({
    //     spnId: spnId
    //   })
    // }

    updateEmploymentStatus() {
        try {
            const data = {
                employmentId: this.employmentId,
                employmentStatus: this.fixedCostCandidateForm.get('employmentDetails.employmentStatus')?.value
            };

            this.apiService.updateEmploymentStatus(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employment Status Updated Successfully' });
                    setTimeout(() => {
                        this.router.navigate(['/home/candidate/fixed-cost']);
                    }, 2000);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    addExistingCandidate() {
        console.log(this.fixedCostCandidateForm.value);
        const formValue = this.fixedCostCandidateForm.value;

        let data;

        if (this.candidateId) {
            const payload = formValue;
            data = {
                ...payload,
                candidateId: this.candidateId
            };
        } else {
            data = formValue;
        }

        this.fixedCostCandidateApi(data);
        // if (this.fixedCostCandidateForm.get('employmentDetails.employmentStatus')?.valid) {
        //   this.updateEmploymentStatus();
        // }
    }
}
