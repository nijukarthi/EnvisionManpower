import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-new-candidate-fixed-cost',
    imports: [Shared],
    templateUrl: './candidate-fixed-cost.html',
    styleUrl: './candidate-fixed-cost.scss'
})
export class CandidateFixedCost implements OnInit {
    offSet = 0;
    pageSize = 10;
    first = 0;
    fixedCostCandidateListLength = 0;

    fixedCostCandidateList: any;

    constructor(
        private apiService: Apiservice,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.fetchActiveFixedCostCandidates();
    }

    getMenuItems(candidate: any) {
        return [
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => this.router.navigate(['/home/candidates/fixed-cost', candidate.candidateId])
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => this.deleteFixedCostCandidate(candidate)
            }
        ];
    }

    fetchActiveFixedCostCandidates() {
        const data = {
            offSet: this.offSet,
            pageSize: this.pageSize
        };

        this.apiService.fetchActiveFixedCostCandidates(data).subscribe({
            next: (val) => {
                console.log(val);
                this.fixedCostCandidateList = val?.data?.data;
                this.fixedCostCandidateListLength = val?.data.length ?? 0;
            },
            error: (err) => {
                console.log(err);
            },
            complete: () => console.log('Complete signal')
        });
    }

    deleteFixedCostCandidate(candidate: any) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record',
            header: `Delete ${candidate.candidateCode}`,
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger'
            },
            accept: () => {
                try {
                    const data = {
                        candidateId: candidate.candidateId
                    };

                    this.apiService.deleteCandidate(data).subscribe({
                        next: (val) => {
                            console.log(val);
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: `${candidate.candidateCode} Deleted Successfully` });
                            this.fetchActiveFixedCostCandidates();
                        },
                        error: (err) => {
                            console.log(err);

                            if (err.status === 400) {
                                this.messageService.add({ severity: 'info', summary: 'Info', detail: `${err.error.detail}` });
                            }
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    pageChange(event: any) {
        this.first = event.first;
        this.offSet = event.first / event.rows;
        this.pageSize = event.rows;
        this.fetchActiveFixedCostCandidates();
    }
}
