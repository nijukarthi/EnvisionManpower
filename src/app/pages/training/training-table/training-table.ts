import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-training-table',
  imports: [Shared],
  templateUrl: './training-table.html',
  styleUrl: './training-table.scss'
})
export class TrainingTable implements OnInit {
  offSet = 0;
  pageSize = 10;
  first = 0;

  trainingList: any;
  trainingListLength = 0;

  trainingStatusList = [
    {
      label: 'Yes',
      value: true
    },
    {
      label: 'No',
      value: false
    }
  ]

  constructor(private apiService: Apiservice, private messageService: MessageService){}

  ngOnInit(): void {
    this.fetchActiveTrainingList();
  }

  fetchActiveTrainingList(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      console.log(data);
      
      this.apiService.fetchOnRollCandidates(data).subscribe({
        next: val => {
          console.log(val);
          this.trainingList = val.data.data.map((training: any) => ({
            ...training,
            gwoTraining: training.gwoTraining || {
              trainingStatus: null,
              windaId: null,
              validFrom: null,
              validTill: null
            }
          }));
          this.trainingListLength = val?.data.length;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  getTrainingStatus(value: boolean){
    const status = this.trainingStatusList.find(item => item.value === value);
    return status?.label || '-';
  }

  submitTrainingForm(training: any){
    try {
      console.log(training);

      const data = {
        candidateId: training.candidateId,
        trainingStatus: training.gwoTraining.trainingStatus,
        windaId: training.gwoTraining.windaId,
        validFrom: training.gwoTraining.validFrom,
        validTill: training.gwoTraining.validTill
      }
      console.log(data);

      this.apiService.updateGwoTraining(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Candidate GWO Training Details Updated Successfully'});
          this.fetchActiveTrainingList();
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  pageChange(event: any){
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;
    this.fetchActiveTrainingList();
  }
}
