import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-site-wise-dpr-input',
  imports: [Shared],
  templateUrl: './site-wise-dpr-input.html',
  styleUrl: './site-wise-dpr-input.scss'
})
export class SiteWiseDprInput implements OnInit {
  @ViewChild('excelInput') excelInput!: ElementRef<HTMLInputElement>;

  offSet = 0;
  pageSize =  10;
  first = 0;
  totalRecords = 0;

  selectedProjCode = '';

  menuItems: any[] = [];
  projectMenuItems: any[] = [];
  selectedDprProject: any[] = [];

  dprProjectList: any;
  selectedDprProj: any;
  selectedProject: any;
  filteredData: any;

  selectedImportType!: 'PQ' | 'DR' | 'FIC';

  currentUser = Number(sessionStorage.getItem('userGroupId'));
  currentUserEmail = sessionStorage.getItem('userEmail');

  constructor(private router: Router, private confirmationService: ConfirmationService, 
    private apiService: Apiservice, private messageService: MessageService){}


  ngOnInit(): void {
    this.menuItems = this.getMenuItems(); 
    this.projectMenuItems = this.getProjectMenuItems();

    this.fetchDprProjectDetails();
  }

  dprProjectDetailsApi(data: any){
    try {
      this.apiService.fetchDprProjectList(data).subscribe({
        next: val => {
          this.dprProjectList = val?.data?.data;
          this.totalRecords = val?.data?.length ?? 0;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchDprProjectDetails(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      };

      this.dprProjectDetailsApi(data);
    } catch (error) {
      console.log(error);
    }
  }

  selectedProj(proj: any){
    this.selectedProject = proj;
    this.selectedProjCode = proj.projectCode;
  }

  unSelectedProj(){
    this.selectedProject = null;
    this.selectedProjCode = '';
  }

  getMenuItems(){
    return [
      {
        label: 'DPR Template',
        icon: 'pi pi-file',
        items: [
          {
            label: 'Import DPR Template',
            icon: 'pi pi-upload',
            items: [
              {
                label: 'Import Production & Quality',
                command: () => this.openExcelPicker('PQ')
              },
              {
                label: 'Import Dispatch & Receiving',
                command: () => this.openExcelPicker('DR')
              },
              {
                label: 'Import Foundation and I&C',
                command: () => this.openExcelPicker('FIC')
              }
            ]
          },
          {
            label: 'Export DPR Template',
            icon: 'pi pi-download',
            items: [
              {
                label: 'Export Production & Quality',
                command: () => this.exportProdQualExcel()
              },
              {
                label: 'Export Dispatch & Receiving',
                command: () => this.exportDispRecvExcel()
              },
              {
                label: 'Export Foundation and I&C',
                command: () => this.exportFndICExcel()
              }
            ]
          }
        ]
      },
      {
        label: 'Export',
        icon: 'pi pi-download',
        command: () => this.exportToExcel()
      }  
    ]
  }

  getProjectMenuItems(){
    return [
      {
        label: 'Edit DPR Project',
        icon: 'pi pi-pencil',
        command: () => this.router.navigate(['/home/dpr-project-details', this.selectedDprProj.dprProjectDetailsId,'update'], {
          state: {
            dprProjectDetails: this.selectedDprProj
          }
        })
      },
      {
        label: 'View WTG Details',
        icon: 'pi pi-pencil',
        command: () => this.router.navigate(['/home/dpr-project-details', this.selectedDprProj.dprProjectDetailsId,'wtg-details'], {
          state: {
            dprProjectDetails: this.selectedDprProj
          }
        })
      },
      {
        label: 'Delete DPR Project',
        icon: 'pi pi-trash',
        visible: this.currentUser === UserGroups.ADMIN,
        command: () => this.deleteDprProject()
      }
    ]
  }

  importProdQualExcel(file: File){
    try {
      if (!this.selectedProject?.dprProjectDetailsId) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Select Any Project' });
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', this.selectedProject?.dprProjectDetailsId.toString());

      this.apiService.importProdQualExcel(formData).subscribe({
        next: val => {
          this.fetchDprProjectDetails();
          this.selectedDprProject = [];
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Excel uploaded successfully' });
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

  importDispRecvExcel(file: File){
    try {
      if (!this.selectedProject?.dprProjectDetailsId) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Select Any Project' });
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', this.selectedProject.dprProjectDetailsId.toString());

      this.apiService.importDispRecvExcel(formData).subscribe({
        next: val => {
          this.fetchDprProjectDetails();
          this.selectedDprProject = [];
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Excel uploaded successfully' });
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

  importFndICExcel(file: File){
    try {
      if (!this.selectedProject?.dprProjectDetailsId) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Select Any Project' });
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', this.selectedProject.dprProjectDetailsId.toString());

      this.apiService.importFndICExcel(formData).subscribe({
        next: val => {
          this.fetchDprProjectDetails();
          this.selectedDprProject = [];
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Excel uploaded successfully' });
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

  exportProdQualExcel(){
    try {
      if(!this.selectedProjCode){
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Select Any Project' });
        return;
      }

      this.apiService.exportProdQualExcel(this.selectedProjCode).subscribe({
        next: (val: Blob) => {
          const url = window.URL.createObjectURL(val);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Production_Quality_${this.selectedProjCode}.xlsx`;
          a.click();
          window.URL.revokeObjectURL(url);
          this.selectedDprProject = [];
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Production & Quality excel template downloaded successfully.' });
        },
        error: async(err) => {
          console.log(err);
          if (err.error instanceof Blob) {
            const text = await err.error.text();
            const json = JSON.parse(text);

            this.messageService.add({severity: 'error', summary: 'Error', detail: json.detail || 'Something went wrong' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail || 'Something went wrong' });
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  exportDispRecvExcel(){
    try {
      if (!this.selectedProjCode) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Select Any Project' });
        return;
      }

      this.apiService.exportDispRecvExcel(this.selectedProjCode).subscribe({
        next: val => {
          const url = window.URL.createObjectURL(val);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Dispatch_Receiving_${this.selectedProjCode}.xlsx`;
          a.click();
          window.URL.revokeObjectURL(url);
          this.selectedDprProject = [];
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Dispatch & Receiving excel template downloaded successfully.' });
        },
        error: async(err) => {
          console.log(err);

          if (err.error instanceof Blob) {
            const text = await err.error.text();
            const json = JSON.parse(text);
            this.messageService.add({severity: 'error', summary: 'Error', detail: json.detail || 'Something went wrong' });
          } else {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail || 'Something went wrong' });
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  exportFndICExcel(){
    try {
      if(!this.selectedProjCode){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Select Any Project' });
        return;
      }

      this.apiService.exportFndICExcel(this.selectedProjCode).subscribe({
        next: val => {
          const url = window.URL.createObjectURL(val);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Foundation_Installation_Commissioning_${this.selectedProjCode}.xlsx`;
          a.click();
          window.URL.revokeObjectURL(url);
          this.selectedDprProject = [];
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Foundation, Installation & Commissioning excel template downloaded successfully.' });
        },
        error: async(err) => {
          console.log(err);

          if (err.error instanceof Blob) {
            const text = await err.error.text();
            const json = JSON.parse(text);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: json.detail || 'Something went wrong' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  openExcelPicker(type: 'PQ' | 'DR' | 'FIC'){
    this.selectedImportType = type;
    this.excelInput.nativeElement.click();
  }

  excelSelected(event: Event){
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if(!file) return;

    switch(this.selectedImportType){
      case 'PQ':
        this.importProdQualExcel(file);
        break;
      case 'DR':
        this.importDispRecvExcel(file);
        break;
      case 'FIC':
        this.importFndICExcel(file);
        break;
    }
    input.value = '';
  }

  exportToExcel(){
    const emailText = this.currentUserEmail ?? 'your email address';

    this.confirmationService.confirm({
      message: `The Excel file will be sent to ${emailText}. Do you want to proceed?`,
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true
      },
      acceptButtonProps: {
          label: 'OK'
      },
      accept: () => {
        try {
          const data = {
            ...this.filteredData,
            isExport: true
          }

          this.apiService.fetchDprProjectList(data).subscribe({
            next: val => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Excel file successfully send to email' });
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
    })
  }

  deleteDprProject(){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: `Delete ${this.selectedDprProj.projectCode}`,
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
            dprProjectDetailsId: this.selectedDprProj.dprProjectDetailsId
          }

          this.apiService.deleteDprProject(data).subscribe({
            next: val => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'DPR Project Deleted Successfully' });
              this.fetchDprProjectDetails();
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

  dprProjectMenu(event: Event, menu: any, project: any){
    this.selectedDprProj = project;
    menu.toggle(event);
  }

  loadDprProject(event: any){
    try {
      this.first = event.first;
      this.offSet = event.first / event.rows;
      this.pageSize = event.rows;

      const filters = event.filters;

      this.filteredData = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        projectCode: filters?.projectCode?.[0]?.value ?? null,
        projectDescription: filters?.projectDescription?.[0]?.value ?? null,
        customerName: filters?.customerName?.[0]?.value ?? null,
        clusterName: filters?.clusterName?.[0]?.value ?? null,
        zone: filters?.zone?.[0]?.value ?? null
      };

      this.dprProjectDetailsApi(this.filteredData);
    } catch (error) {
      console.log(error);
    }
  }
}

