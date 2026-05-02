import { PurchaseOrderStatus } from '@/models/purchase-order-status/purchase-order-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-po-assign-table',
  imports: [Shared],
  templateUrl: './po-assign-table.html',
  styleUrl: './po-assign-table.scss'
})
export class PoAssignTable implements OnInit {
  poList: any; 
  selectedPO: any;
  filteredData: any;

  statuses: any[] = [];

  offSet = 0;
  pageSize = 10;
  first = 0;
  totalRecords = 0;
  selectedPOId = 0;
  visibleCount = 4;

  poStatus = '';

  currentUser = Number(sessionStorage.getItem('userGroupId'));

  USERGROUPS = UserGroups;

  expanded = false;

  selectedStatuses: string[] = ['DRAFT', 'ACTIVE', 'SUSPENDED', 
    'UTILIZED', 'EXPIRED', 'CANCELLED'];

  items = [
    {
      label: 'PO Status',
      icon: 'pi pi-exclamation-circle',
      items: [
        {
          label: PurchaseOrderStatus.ACTIVE,
          command: () => this.confirmPOStatus(PurchaseOrderStatus.ACTIVE)
        },
        {
          label: PurchaseOrderStatus.UTILIZED,
          command: () => this.confirmPOStatus(PurchaseOrderStatus.UTILIZED)
        },
        {
          label: PurchaseOrderStatus.SUSPENDED,
          command: () => this.confirmPOStatus(PurchaseOrderStatus.SUSPENDED)
        },
        {
          label: PurchaseOrderStatus.EXPIRED,
          command: () => this.confirmPOStatus(PurchaseOrderStatus.EXPIRED)
        },
        {
          label: PurchaseOrderStatus.CANCELLED,
          command: () => this.confirmPOStatus(PurchaseOrderStatus.CANCELLED)
        },
      ]
    }
  ];

  constructor(private apiService: Apiservice, private messageService: MessageService, 
    private confirmationService: ConfirmationService, private router: Router){}

  ngOnInit(): void {
    this.fetchPOList();

    this.statuses = [
      { label: 'DRAFT', value: PurchaseOrderStatus.DRAFT },
      { label: 'ACTIVE', value: PurchaseOrderStatus.ACTIVE },
      { label: 'SUSPENDED', value: PurchaseOrderStatus.SUSPENDED },
      { label: 'UTILIZED', value: PurchaseOrderStatus.UTILIZED },
      { label: 'EXPIRED', value: PurchaseOrderStatus.EXPIRED },
      { label: 'CANCELLED', value: PurchaseOrderStatus.CANCELLED }
    ];
  }

  getMenuItems(po: any){
    return [
      {
        label: 'View',
        icon: 'pi pi-eye'
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.router.navigate(['/home/po-assign', po.poId, 'edit'])
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash'
      }
    ]
  }

  getSeverity(status: string){
    switch(status){
      case PurchaseOrderStatus.DRAFT:
        return 'primary';
      case PurchaseOrderStatus.ACTIVE:
        return 'primary';
      case PurchaseOrderStatus.UTILIZED:
        return 'secondary';
      case PurchaseOrderStatus.SUSPENDED:
        return 'warn';
      case PurchaseOrderStatus.EXPIRED:
        return 'danger';
      case PurchaseOrderStatus.CANCELLED:
        return 'danger';
      default:
        return 'primary';
    }
  }

  assignPOApi(data: any){
    try {
      this.apiService.fetchPOList(data).subscribe({
        next: val => {
          console.log(val);
          this.poList = val?.data?.data.map((po: any) => {
            const start = new Date(po.validFrom);
            const end = new Date(po.validTo);

            const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

            return {
              ...po,
              duration: `${months} months`
            }
          });
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

  fetchPOList(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      console.log(data);

      this.assignPOApi(data);
    } catch (error) {
      console.log(error);
    }
  }

  selectedPOEmployee(po: any){
    console.log(po);
    this.selectedPOId = po.poId;
  }

  unSelectedEmployee(){
    // console.log(po);
    this.selectedPOId = 0;
  }

  confirmPOStatus(status: string){
    this.poStatus = status;
    this.confirmationService.confirm({
            header: 'Are you sure?',
            message: 'Please confirm to proceed.',
            accept: () => this.updatePOStatus(this.poStatus)
        });
  }

  updatePOStatus(status: string){
    try {
      const data = {
        poId: this.selectedPOId,
        poStatus: status
      }

      this.apiService.updatePOStatus(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: `Purchase Order Moved to '${this.poStatus}' Successfully`});
          this.fetchPOList();
        },
        error: err => {
          console.log(err);

          if (err.status === 400) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  loadPOAssign(event: any){
    try {
      this.first = event.first;
      this.offSet = event.first / event.rows;
      this.pageSize = event.rows;
  
      const filters = event.filters;
      console.log(filters);

      const formatDate = (d: any) => {
        if (!d) return null;
        return typeof d === 'string' ? d : d.toLocaleDateString('en-CA');
      };

      const dateValue = filters?.date?.[0]?.value;

      this.filteredData = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        poNumber: filters?.poNumber?.[0]?.value ?? '',
        poStatus: filters?.status?.[0]?.value ?? null,
        consultancyName: filters?.consultancyName?.[0]?.value ?? '',
        dateFrom: Array.isArray(dateValue) ? formatDate(dateValue[0]) : null,
        dateTo: Array.isArray(dateValue) ? formatDate(dateValue[1]) : null
      }

      console.log(this.filteredData);

      this.assignPOApi(this.filteredData);
    } catch (error) {
      console.log(error);
    }
  }

  updateRange(selectedValue: any, value: any[], index: number, filter: any) {
    if (!value) value = [];

    value[index] = selectedValue;

    filter(value);
  }

  get remainingCount() {
    return this.selectedStatuses.length - this.visibleCount;
  }

  toggleStatuses() {
    this.expanded = !this.expanded;
  }

  get visibleStatuses() {
    return this.expanded
        ? this.selectedStatuses
        : this.selectedStatuses.slice(0, 4);
  }

  formatStatus(status: string) {
    return status.replace(/_/g, ' ').toLowerCase()
        .replace(/\b\w/g, c => c.toUpperCase());
  }

  removeStatus(status: string, event?: Event) {}
}
