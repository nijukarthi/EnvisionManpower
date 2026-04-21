import { WtgActivities } from '@/models/wtg-activities/wtg-activities.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-wtg-details',
  imports: [Shared],
  templateUrl: './view-wtg-details.html',
  styleUrl: './view-wtg-details.scss'
})
export class ViewWtgDetails implements OnInit {
  offSet = 0;
  pageSize =  10;
  first = 0;
  totalRecords = 0;
  selectedDprProjId = 0;

  showProductionComponent = false;
  showQualityComponent = false;
  showDispatchComponent = false;
  showReceivingComponent = false;
  showFoundation = false;
  showInstallation = false;
  showCommissioning = false;

  wtgDetailsModal = false;

  maxDate: Date | undefined;

  selectedWTGActivity: string | null = null;

  menuItems: any[] = [];
  updatedRows: any[] = [];
  originalDprProjectWtgList: any[] = [];

  dprProjectWtgList: any;
  dprProjWtgDetails: any;
  selectedWtgDetails: any;
  filteredData: any;

  WTGACTIVITIES = WtgActivities;

  private fb = inject(FormBuilder);

  constructor(private router: Router, 
    private apiService: Apiservice, 
    private route: ActivatedRoute, 
    private messageService: MessageService,
    private filterService: FilterService
  ){}

  updateWtgDetailsForm = this.fb.group({
    wtgDetails: this.fb.array([this.wtgArray()])   
  })

  wtgArray(){
    return this.fb.group({
      wtgDetailId: [0],
      wtgLocation: [''],
      maximoId: [''],
      towerModel: ['']
    });
  }

  get wtgDetails(){
    return this.updateWtgDetailsForm.get('wtgDetails') as FormArray;
  }

  taskList = [
    {
      label: 'Production',
      value: this.WTGACTIVITIES.PRODUCTION
    },
    {
      label: 'Quality', 
      value: this.WTGACTIVITIES.QUALITY
    },
    {
      label: 'Dispatch',
      value: this.WTGACTIVITIES.DISPATCH
    },
    {
      label: 'Receiving',
      value: this.WTGACTIVITIES.RECEIVING
    },
    {
      label: 'Foundation',
      value: this.WTGACTIVITIES.FOUNDATION
    },
    {
      label: 'Installation',
      value: this.WTGACTIVITIES.INSTALLATION
    },
    {
      label: 'Commissioning',
      value: this.WTGACTIVITIES.COMMISSIONING
    }
  ];

  dateFilterOptions = [
    { label: 'Blank', value: 'isEmpty' }
  ];

  ngOnInit(): void {
    this.dprProjWtgDetails = history.state;
    this.menuItems = this.getMenuItems();

    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');

      if (id) {
        this.selectedDprProjId = Number(id);
      }
    });

    this.fetchDprProjWTGList();

    const today = new Date();
    this.maxDate = new Date(today);

    this.filterService.register('isEmpty', (value: any) => {
      console.log(value);
      return value === null || value === undefined || value === '';
    });
  }

  dprProjWtgApi(data: any){
    try {
      this.apiService.fetchDprProjWTGList(data).subscribe({
        next: val => {
          this.dprProjectWtgList = val?.data?.data.map((wtg: any) => {

            wtg.wtgFoundation ??= {};
            wtg.wtgProduction ??= {};
            wtg.wtgQuality ??= {};
            wtg.wtgDispatch ??= {};
            wtg.wtgReceiving ??= {};
            wtg.wtgInstallation ??= {};
            wtg.wtgCommissioning ??= {};

            this.convertDates(wtg.wtgFoundation, [
              'foundationDate'
            ]);

          this.convertDates(wtg.wtgProduction, [
            'nacelleProductionActual',
            'hubProductionActual',
            'bladeProductionActual',
            'towerProductionActual'
          ]);

          this.convertDates(wtg.wtgQuality, [
            'bladeCustomerInspectionActual',
            'bladeFinalQcActual',
            'bladeInspectionCallActual',
            'bladeMdccActual',
            'hubCustomerInspectionActual',
            'hubFinalQcActual',
            'hubInspectionCallActual',
            'hubMdccActual',
            'nacelleCustomerInspectionActual',
            'nacelleFinalQcActual',
            'nacelleInspectionCallActual',
            'nacelleMdccActual',
            'towerCustomerInspectionActual',
            'towerFinalQcActual',
            'towerInspectionCallActual',
            'towerMdccActual'
          ]);

          this.convertDates(wtg.wtgDispatch, [
            'nacelleDispatchActual',
            'hubDispatchActual',
            'bladeDispatchActual',
            'towerDispatchActual'
          ]);

          this.convertDates(wtg.wtgReceiving, [
            'bladeMvcDate',
            'bladeReceivingActual',
            'hubMvcDate',
            'hubReceivingActual',
            'nacelleMvcDate',
            'nacelleReceivingActual',
            'towerMvcDate',
            'towerReceivingActual'
          ]);

            return wtg;
          });

          this.originalDprProjectWtgList = structuredClone(this.dprProjectWtgList);
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

  fetchDprProjWTGList(){
    try {
      const data = {
        dprProjectDetailsId: this.selectedDprProjId,
        activity: this.selectedWTGActivity,
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      this.dprProjWtgApi(data);
    } catch (error) {
      console.log(error);
    }
  }

  openWtgDetailsModal(){
    try {
      this.wtgDetailsModal = true;
      this.wtgDetails.at(0).patchValue({
        wtgLocation: this.selectedWtgDetails.wtgLocation,
        maximoId: this.selectedWtgDetails.maximoId,
        towerModel: this.selectedWtgDetails.towerModel
      })
    } catch (error) {
      console.log(error);
    }
  }

  updateWtgDetails(){
    try {
      this.wtgDetails.at(0).patchValue({
        ...this.wtgDetails.value,
        wtgDetailId: this.selectedWtgDetails.wtgDetailId
      })
      const data = this.wtgDetails.value;

      this.apiService.updateWtgDetails(data).subscribe({
        next: val => {
          this.wtgDetailsModal = false;
          this.fetchDprProjWTGList();
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'WTG Details Updated Successfully'});
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  checkEqual(obj1: any, obj2: any): boolean{
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  saveTask(){
    if (this.showProductionComponent) {    
      try {
        const updatedRows = this.dprProjectWtgList.filter((row: any) => {
          const originalRow = this.originalDprProjectWtgList.find(
            o => o.wtgDetailId === row.wtgDetailId
          );

          return !this.checkEqual(row.wtgProduction, originalRow.wtgProduction);
        })

        if (updatedRows.length === 0) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please update at least one date'});
          return;
        }

        const data = updatedRows.map((wtg: any) => ({
          wtgDetailId: wtg?.wtgDetailId,
          nacelleProductionActual: this.formatDate(wtg.wtgProduction.nacelleProductionActual),
          hubProductionActual: this.formatDate(wtg.wtgProduction.hubProductionActual),
          bladeProductionActual: this.formatDate(wtg.wtgProduction.bladeProductionActual),
          towerProductionActual: this.formatDate(wtg.wtgProduction.towerProductionActual)
        }))
  
        this.apiService.updateProdActivity(data).subscribe({
          next: val => {
            this.fetchDprProjWTGList();
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Production Task Updated Successfully'});
          },
          error: err => {
            console.log(err);

            if (err.status === 400) {
              this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail });
            }
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
    if (this.showQualityComponent) {
      try {
        const updatedRows = this.dprProjectWtgList.filter((row: any) => {
          const originalRow = this.originalDprProjectWtgList.find(
            o => o.wtgDetailId === row.wtgDetailId
          );

          return !this.checkEqual(row.wtgQuality, originalRow.wtgQuality);
        })

        if (updatedRows.length === 0) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please update at least one date'});
          return;
        }

        const data = updatedRows.map((wtg: any) => ({
          wtgDetailId: wtg.wtgDetailId,
          nacelleFinalQcActual: this.formatDate(wtg.wtgQuality.nacelleFinalQcActual),
          nacelleInspectionCallActual: this.formatDate(wtg.wtgQuality.nacelleInspectionCallActual),
          nacelleCustomerInspectionActual: this.formatDate(wtg.wtgQuality.nacelleCustomerInspectionActual),
          nacelleMdccActual: this.formatDate(wtg.wtgQuality.nacelleMdccActual),
          hubFinalQcActual: this.formatDate(wtg.wtgQuality.hubFinalQcActual),
          hubInspectionCallActual: this.formatDate(wtg.wtgQuality.hubInspectionCallActual),
          hubCustomerInspectionActual: this.formatDate(wtg.wtgQuality.hubCustomerInspectionActual),
          hubMdccActual: this.formatDate(wtg.wtgQuality.hubMdccActual),
          bladeFinalQcActual: this.formatDate(wtg.wtgQuality.bladeFinalQcActual),
          bladeInspectionCallActual: this.formatDate(wtg.wtgQuality.bladeInspectionCallActual),
          bladeCustomerInspectionActual: this.formatDate(wtg.wtgQuality.bladeCustomerInspectionActual),
          bladeMdccActual: this.formatDate(wtg.wtgQuality.bladeMdccActual),
          towerFinalQcActual: this.formatDate(wtg.wtgQuality.towerFinalQcActual),
          towerInspectionCallActual: this.formatDate(wtg.wtgQuality.towerInspectionCallActual),
          towerCustomerInspectionActual: this.formatDate(wtg.wtgQuality.towerCustomerInspectionActual),
          towerMdccActual: this.formatDate(wtg.wtgQuality.towerMdccActual)
        }));

        this.apiService.updateQualActivity(data).subscribe({
          next: val => {
            this.fetchDprProjWTGList();
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Quality Task Updated Successfully'});
          },
          error: err => {
            console.log(err);

            if (err.status === 400) {
              this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail });
            }
          }
        })
      } catch (error) {
        console.log(error);
      }
    }

    if (this.showDispatchComponent) {
      try {
        const updatedRows = this.dprProjectWtgList.filter((row: any) => {
          const originalRow = this.originalDprProjectWtgList.find(
            o => o.wtgDetailId === row.wtgDetailId
          )

          return !this.checkEqual(row.wtgDispatch, originalRow.wtgDispatch);
        });

        if (updatedRows.length === 0) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please update at least one date'});
          return;
        }

        const data = updatedRows.map((wtg: any) => ({
          wtgDetailId: wtg.wtgDetailId,
          nacelleDispatchActual: this.formatDate(wtg.wtgDispatch.nacelleDispatchActual),
          hubDispatchActual: this.formatDate(wtg.wtgDispatch.hubDispatchActual),
          bladeDispatchActual: this.formatDate(wtg.wtgDispatch.bladeDispatchActual),
          towerDispatchActual: this.formatDate(wtg.wtgDispatch.towerDispatchActual)
        }));

        this.apiService.updateDispatchActivity(data).subscribe({
          next: val => {
            this.fetchDprProjWTGList();
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Dispatch Task Updated Successfully'});
          },
          error: err => {
            console.log(err);

            if (err.status === 400) {
              this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail });
            }
          }
        })
      } catch (error) {
        console.log(error);
      }
    }

    if (this.showReceivingComponent) {
      try {
        const updatedRows = this.dprProjectWtgList.filter((row: any) => {
          const originalRow = this.originalDprProjectWtgList.find(
            o => o.wtgDetailId === row.wtgDetailId
          )

          return !this.checkEqual(row.wtgReceiving, originalRow.wtgReceiving);
        });

        if (updatedRows.length === 0) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please update at least one date'});
          return;
        }

        const data = updatedRows.map((wtg: any) => ({
          wtgDetailId: wtg.wtgDetailId,
          nacelleReceivingActual: this.formatDate(wtg.wtgReceiving.nacelleReceivingActual),
          nacelleMvcDate: this.formatDate(wtg.wtgReceiving.nacelleMvcDate),
          hubReceivingActual: this.formatDate(wtg.wtgReceiving.hubReceivingActual),
          hubMvcDate: this.formatDate(wtg.wtgReceiving.hubMvcDate),
          bladeReceivingActual: this.formatDate(wtg.wtgReceiving.bladeReceivingActual),
          bladeMvcDate: this.formatDate(wtg.wtgReceiving.bladeMvcDate),
          towerReceivingActual: this.formatDate(wtg.wtgReceiving.towerReceivingActual),
          towerMvcDate: this.formatDate(wtg.wtgReceiving.towerMvcDate)
        }));

        this.apiService.updateReceivingActivity(data).subscribe({
          next: val => {
            this.fetchDprProjWTGList();
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Receiving Task Updated Successfully'});
          },
          error: err => {
            console.log(err);

            if (err.status === 400) {
              this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail });
            }
          }
        })
      } catch (error) {
        console.log(error);
      }
    }

    if (this.showFoundation) {
      try {
        const updatedRows = this.dprProjectWtgList.filter((row: any) => {
          const originalRow = this.originalDprProjectWtgList.find(
            o => o.wtgDetailId === row.wtgDetailId
          )

          return !this.checkEqual(row.wtgFoundation, originalRow.wtgFoundation);
        });

        if (updatedRows.length === 0) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please update at least one date'});
          return;
        }

        const data = updatedRows.map((wtg: any) => ({
          wtgDetailId: wtg.wtgDetailId,
          foundationDate: this.formatDate(wtg.wtgFoundation.foundationDate)
        }));

        this.apiService.updateFoundationActivity(data).subscribe({
          next: val => {
            this.fetchDprProjWTGList();
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Foundation Task Updated Successfully'});
          },
          error: err => {
            console.log(err);

            if (err.status === 400) {
              this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail });
            }
          }
        })
      } catch (error) {
        console.log(error);
      }
    }

    if (this.showInstallation) {
      try {
        const updatedRows = this.dprProjectWtgList.filter((row: any) => {
          const originalRow = this.originalDprProjectWtgList.find(
            o => o.wtgDetailId === row.wtgDetailId
          )

          return !this.checkEqual(row.wtgInstallation, originalRow.wtgInstallation)
        });

        if (updatedRows.length === 0) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please update at least one date'});
          return;
        }

        const data = updatedRows.map((wtg: any) => ({
          wtgDetailId: wtg.wtgDetailId,
          installationDate: this.formatDate(wtg?.wtgInstallation?.installationDate),
          mccDate: this.formatDate(wtg?.wtgInstallation?.mccDate),
          mccSignOffDate: this.formatDate(wtg?.wtgInstallation?.mccSignOffDate)
        }));

        this.apiService.updateInstallationActivity(data).subscribe({
          next: val => {
            this.fetchDprProjWTGList();
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Installation Task Updated Successfully'});
          },
          error: err => {
            console.log(err);

            if (err.status === 400) {
              this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail });
            }
          }
        })
      } catch (error) {
        console.log(error);
      }
    }

    if (this.showCommissioning) {
      try {
        const updatedRows = this.dprProjectWtgList.filter((row: any) => {
          const originalRow = this.originalDprProjectWtgList.find(
            o => o.wtgDetailId === row.wtgDetailId
          );

          return !this.checkEqual(row.wtgCommissioning, originalRow.wtgCommissioning);
        });

        if (updatedRows.length === 0) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please update at least one date'});
          return;
        }

        const data = updatedRows.map((wtg: any) => ({
          wtgDetailId: wtg.wtgDetailId,
          preCommissioningDate: this.formatDate(wtg.wtgCommissioning.preCommissioningDate),
          commissioningDate: this.formatDate(wtg.wtgCommissioning.commissioningDate),
          stptDate: this.formatDate(wtg.wtgCommissioning.stptDate),
          stptSignOffDate: this.formatDate(wtg.wtgCommissioning.stptSignOffDate),
          hotoDate: this.formatDate(wtg.wtgCommissioning.hotoDate)
        }));

        this.apiService.updateCommissioningActivity(data).subscribe({
          next: val => {
            this.fetchDprProjWTGList();
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Commissioning Task Updated Successfully'});
          },
          error: err => {
            console.log(err);

            if (err.status === 400) {
              this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail });
            }
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

  wtgModelList = [
    {
      label: 'EN 156_3.3MW',
      value: 'EN 156_3.3MW'
    },
    {
      label: 'EN 182_5.0MW',
      value: 'EN 182_5.0MW'
    }
  ];

  wtgModelFilterList = [
    {
      label: 'EN 156_3.3MW',
      value: 10
    },
    {
      label: 'EN 182_5.0MW',
      value: 11
    }
  ]

  getMenuItems(){
    return [
      {
        label: 'Edit WTG Details',
        icon: 'pi pi-pencil',
        command: () => this.openWtgDetailsModal()
      }
    ]
  }

  dprType = [
    { 
      label: 'Site Wise Manufacturing Input'
    },
    {
      label: 'Site Wise I&C Input'
    }
  ]

  wtgDetailsMenu(event: Event, menu: any, wtg: any){
    this.selectedWtgDetails = wtg;
    menu.toggle(event);
  }

  selectedTask(task: string){
    this.selectedWTGActivity = task;

    this.showProductionComponent = task === this.WTGACTIVITIES.PRODUCTION;
    this.showQualityComponent = task === this.WTGACTIVITIES.QUALITY;
    this.showDispatchComponent = task === this.WTGACTIVITIES.DISPATCH;
    this.showReceivingComponent = task === this.WTGACTIVITIES.RECEIVING;
    this.showFoundation = task === this.WTGACTIVITIES.FOUNDATION;
    this.showInstallation = task === this.WTGACTIVITIES.INSTALLATION;
    this.showCommissioning = task === this.WTGACTIVITIES.COMMISSIONING;

    this.fetchDprProjWTGList();
    setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 10);
  }

  getTableStyle() {
  // If more columns → allow scroll
  if (
    this.showProductionComponent ||
    this.showQualityComponent ||
    this.showDispatchComponent ||
    this.showReceivingComponent ||
    this.showInstallation ||
    this.showCommissioning
  ) {
    return { 'min-width': '1900px' }; // wide tasks
  }

  // For Foundation (few columns)
  return { 'width': '1800' };
}

  private convertDates(obj: any, dateField: string[]){
    if(!obj) return;

    dateField.forEach(field => {
      obj[field] = obj[field] ? new Date(obj[field]) : null;
    });
  }

  private formatDate(date: Date | null): string | null{
    if(!date) return null;

    if (typeof date === 'string') {
      return date;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  loadWtgDetails(event: any){
    this.first = event.first;
    this.offSet = event.first / event.rows;
    this.pageSize = event.rows;

    const filters = event.filters;
    console.log(filters);

    const wtgLocationFilter = filters?.wtgLocation?.[0];
    console.log(wtgLocationFilter);

    const wtgModelFilter = filters?.wtgModel?.[0];
    console.log(wtgModelFilter);

    const foundationFilter = filters?.foundationDate?.[0];
    console.log(foundationFilter);

    const installationFilter = filters?.installationDate?.[0];
    console.log(installationFilter);

    const mccFilter = filters?.mccDate?.[0];
    console.log(mccFilter);

    const mccSignOffFilter = filters?.mccSignOff?.[0];
    console.log(mccSignOffFilter);

    const preCommissioningFilter = filters?.preCommissioningDate?.[0];
    console.log(preCommissioningFilter);

    const commissioningFilter = filters?.commissioningDate?.[0];
    console.log(commissioningFilter);

    const stptFilter = filters?.stptDate?.[0];
    console.log(stptFilter);

    const stptSignOffFilter = filters?.stptSignOffDate?.[0];
    console.log(stptSignOffFilter);

    const hotoFilter = filters?.hotoDate?.[0];
    console.log(hotoFilter);

    this.filteredData = {
      dprProjectDetailsId: this.selectedDprProjId,
      activity: this.selectedWTGActivity,
      offSet: this.offSet,
      pageSize: this.pageSize,
      filters: {
        wtgNumber: filters?.wtgNumber?.[0]?.value ?? null,
        wtgLocation: wtgLocationFilter?.matchMode === 'isEmpty' ? 'NULL' : wtgLocationFilter?.value ?? null,
        maximoId: filters?.maximoId?.[0]?.value ?? null,
        towerModel: wtgModelFilter?.matchModel === 'isEmpty' ? 'NULL' : wtgModelFilter?.value ?? null,
        foundationDate: foundationFilter?.matchMode === 'isEmpty' ? 'NULL' : foundationFilter?.value ?? null,
        installationDate: installationFilter?.matchMode === 'isEmpty' ? 'NULL' : installationFilter?.value ?? null,
        mccDate: mccFilter?.matchMode === 'isEmpty' ? 'NULL' : mccFilter?.value ?? null,
        mccSignOffDate: mccSignOffFilter?.matchMode === 'isEmpty' ? 'NULL' : mccSignOffFilter?.value ?? null,
        preCommissioningDate: preCommissioningFilter?.matchMode === 'isEmpty' ? 'NULL' : preCommissioningFilter?.value ?? null,
        commissioningDate: commissioningFilter?.matchMode === 'isEmpty' ? 'NULL' : commissioningFilter?.value ?? null,
        stptDate: stptFilter?.matchMode === 'isEmpty' ? 'NULL' : stptFilter?.value ?? null,
        stptSignOffDate: stptSignOffFilter?.matchMode === 'isEmpty' ? 'NULL' : stptSignOffFilter?.value ?? null,
        hotoDate: hotoFilter?.matchMode === 'isEmpty' ? 'NULL' : hotoFilter?.value ?? null
      }
    }

    console.log(this.filteredData);

    this.dprProjWtgApi(this.filteredData);
  }

  onDialogClose(){
    this.updateWtgDetailsForm.reset();
  }
}
