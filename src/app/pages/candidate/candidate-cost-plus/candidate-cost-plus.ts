import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-candidate-cost-plus',
  imports: [Shared],
  templateUrl: './candidate-cost-plus.html',
  styleUrl: './candidate-cost-plus.scss'
})
export class CandidateCostPlus implements OnInit {
  offSet = 0;
  pageSize = 10;
  first = 0;
  costPlusCandidateListLength = 0;

  allCostPlusCandidates: any;
  costPlusCandidateList: any;

  constructor(private apiService: Apiservice, private messageService: MessageService, 
    private confirmationService: ConfirmationService, private router: Router){}

  viewOptions = [
    { label: 'With Employment', value: 'with' },
    { label: 'Without Employment', value: 'without' }
  ]

  ngOnInit(): void {
    this.fetchActiveCostPlusCandidates();
  }

  getMenuItems(candidate: any){
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.router.navigate(['/home/candidates/cost-plus', candidate.candidateId])
       },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteCostPlusCandidate(candidate)
      }
    ]
  }

  fetchActiveCostPlusCandidates(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      this.apiService.fetchActiveCostPlusCandidates(data).subscribe({
        next: val => {
          console.log(val);
          this.allCostPlusCandidates = val?.data?.data;
          this.costPlusCandidateList = val?.data?.data;
          this.costPlusCandidateListLength = val?.data.length;
        }, 
        error: err => {
          console.log(err);
        }
      })

    } catch (error) {
      console.log(error);
    }
  }

  selectedView(selected: string[]){
    if (!selected || selected.length === 0) {
      this.costPlusCandidateList = this.allCostPlusCandidates;
      return;
    }

    if (selected.includes('with') && selected.includes('without')) {
      this.costPlusCandidateList = this.allCostPlusCandidates;
      return;
    }

    if (selected.includes('with')) {
      this.costPlusCandidateList = this.allCostPlusCandidates.filter((candidate: any) => candidate.workingCurrently === true);
      return;
    }

    if (selected.includes('without')) {
      this.costPlusCandidateList = this.allCostPlusCandidates.filter((candidate: any) => candidate.workingCurrently === false);
      return;
    }
  }

  deleteCostPlusCandidate(candidate: any){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record',
      header: `Delete ${candidate.candidateCode}`,
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        try {
          const data = {
            candidateId: candidate.candidateId
          }

          this.apiService.deleteCandidate(data).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({severity: 'success', summary: 'Success', detail: `${candidate.candidateCode} Deleted Successfully`});
              this.fetchActiveCostPlusCandidates();
            },
            error: err => {
              console.log(err);

              if (err.status === 400) {
                this.messageService.add({severity: 'info', summary: 'Info', detail: `${err.error.detail}`});
              }
            }
          })
        } catch (error) {
          console.log(error);
        }
      }
    })
  }

  pageChange(event: any){
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;
    this.fetchActiveCostPlusCandidates();
  }
}
