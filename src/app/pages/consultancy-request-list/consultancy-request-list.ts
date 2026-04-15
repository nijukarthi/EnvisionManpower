import { ApprovalStatus } from '@/models/approval-status/approval-status.enum';
import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-consultancy-request-list',
  imports: [Shared],
  templateUrl: './consultancy-request-list.html',
  styleUrl: './consultancy-request-list.scss'
})
export class ConsultancyRequestList implements OnInit {
  offSet = 0;
  pageSize = 10;
  first = 0;
  totalRecords = 0;

  filteredData: any;

  consulRequestList: any[] = [];

  UserGroups = UserGroups;
  
  currentUser = Number(sessionStorage.getItem('userGroupId'));

  APPROVALSTATUS = ApprovalStatus;

  statusMap: any = {
    102: { label: 'Processing', severity: 'warn' },
    200: { label: 'Completed', severity: 'success' },
    406: { label: 'Rejected', severity: 'danger' }
  }

  constructor(private apiService: Apiservice, private messageService: MessageService){}

  ngOnInit(): void {
    this.fetchConsulRequestList();
  }

  consulReqApi(data: any){
    try {
      this.apiService.fetchConsulRequestList(data).subscribe({
        next: val => {
          console.log(val);
          this.consulRequestList = val?.data?.data;
          this.totalRecords = val?.data?.length;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchConsulRequestList(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      this.consulReqApi(data);
    } catch (error) {
      console.log(error);
    }
  }

  resourceManagerApproval(requestData: any){
    try {
      const data = {
        requestId: requestData.requestId,
        approvalStatus: 200
      }

      console.log(data);

      this.apiService.approveConsulRequest(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Approved Successfully' });
          this.fetchConsulRequestList();
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

  updateRange(selectedValue: any, value: any[], index: number, filter: any) {
    if (!value) value = [];

    value[index] = selectedValue;

    filter(value);
  }

  private formatDateForApi(date: Date, isEndDate = false) {
    if (!date) return null as any;

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    const time = isEndDate ? '23:59:59' : '00:00:00';

    return `${yyyy}-${mm}-${dd}T${time}Z`;
  }

  loadConsulRequest(event: any){
    try {
      this.first = event.first;
      this.offSet = event.first / event.rows;
      this.pageSize = event.rows;

      const filters = event.filters;

      const dateValue = filters?.date?.[0]?.value;

      const from = Array.isArray(dateValue) ? dateValue[0] : null;
      const to = Array.isArray(dateValue) ? dateValue[1] : null;

      this.filteredData = {
        offSet: this.offSet,
        pageSize: this.pageSize,
        employeeCode: filters?.employeeCode?.[0]?.value ?? null,
        candidateCode: filters?.candidateCode?.[0]?.value ?? null,
        candidateName: filters?.candidateName?.[0]?.value ?? null,
        consultancyName: filters?.consultancyName?.[0]?.value ?? null,
        createdOnFrom: from ? this.formatDateForApi(from, false) : null,
        createdOnTo: to ? this.formatDateForApi(to, true) : null,
      }

      this.consulReqApi(this.filteredData);
    } catch (error) {
      console.log(error);
    }
  }

  getStatusLabel(status: number){
    return this.statusMap[status]?.label ?? 'UnKnown';
  }

  getSeverity(status: number): string{
    return this.statusMap[status]?.severity ?? 'primary';
  }
}
