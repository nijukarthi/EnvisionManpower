import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { Observable } from 'rxjs';
import { Spn } from '@/service/masters/spn/spn';
import { Shared } from '@/service/shared';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spn-table',
  imports: [TableModule, ButtonModule, Shared, ReactiveFormsModule],
  templateUrl: './spn-table.html',
  styleUrl: './spn-table.scss'
})
export class SpnTable implements OnInit {
  openSpn = false;

  spnId: number | null = null;

  spnList$!: Observable<any>;

  private spnService = inject(Spn);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);

  spnForm = this.fb.group({
    spnId: [0],
    spnCode: [''],
    spnDescription: [''],
    experience: ['']
  })

  ngOnInit(): void {
    this.spnList$ = this.spnService.fetchActiveSpns();
  }

  getMenuItems(spn: any){
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editSpn(spn.spnId)
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteSpn(spn)
      }
    ]
  }

  experiences = [
    { year: '0' },
    { year: '3-5' },
    { year: '5-8' },
    { year: '6-8' },
    { year: '8-10' },
  ]

  addSpn(){
    try {
      this.openSpn = true;
    } catch (error) {
      console.log(error);
    }
  }

  fetchViewSpn(spnId: number){
    try {
      this.spnService.fetchViewSpn(spnId).subscribe({
        next: val => {
          console.log(val);
          this.spnForm.patchValue(val);
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  editSpn(spnId: number){
    try {
      this.spnId = spnId;
      this.openSpn = true;
      this.fetchViewSpn(this.spnId);
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){
    try {
      console.log(this.spnForm.value);
      if (!this.spnId) {     
        this.spnService.createNewSpn(this.spnForm.value).subscribe({
          next: val => {
            console.log(val);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'SPN Created Successfully'});
            setTimeout(() => {
              this.router.navigate(['/home']).then(success => {
                if (success) {
                  this.router.navigate(['/home/spn']);
                }
              })
            }, 2000);
          },
          error: err => {
            console.log(err);
          }
        })
      } else {
        this.spnForm.patchValue({
          spnId: this.spnId
        })

        this.spnService.updateSpn(this.spnForm.value).subscribe({
          next: val => {
            console.log(val);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'SPN Updated Successfully'});
            setTimeout(() => {
              this.router.navigate(['/home']).then(success => {
                if (success) {
                  this.router.navigate(['/home/spn']);
                }
              })
            }, 2000);
          },
          error: err => {
            console.log(err);

            if (err.status === 400) {
              this.messageService.add({severity: 'error', summary: 'Error', detail: `${err.error.detail}`})
            }
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteSpn(spn: any){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: `Delete ${spn.spnCode}`,
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
          this.spnService.deleteSpn(spn.spnId).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Record deleted'});
              setTimeout(() => {
                this.router.navigate(['/home']).then(success => {
                  if (success) {
                    this.router.navigate(['/home/spn']);
                  }
                })
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
    })
  }

  onDialogClose(){
    this.spnId = null;
    this.spnForm.reset();
  }
}
