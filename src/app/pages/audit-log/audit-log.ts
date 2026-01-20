import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-audit-log',
    imports: [Shared],
    templateUrl: './audit-log.html',
    styleUrl: './audit-log.scss'
})
export class AuditLog implements OnInit {
    offSet = 0;
    pageSize = 10;
    first = 0;
    totalRecords = 0;

    filteredData: any;

    logsList: any;

    constructor(private apiService: Apiservice) {}

    ngOnInit(): void {
        this.fetchLogsList();
    }

    auditLogApi(data: any) {
        try {
            this.apiService.logsList(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.logsList = val?.data?.data;
                    this.totalRecords = val?.data?.length ?? 0;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    fetchLogsList() {
        try {
            const data = {
                offSet: this.offSet,
                pageSize: this.pageSize
            };

            console.log(data);
            this.auditLogApi(data);
        } catch (error) {
            console.log(error);
        }
    }

    loadAuditLog(event: any) {
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
                userName: filters?.userName?.[0]?.value ?? null,
                fromDate: Array.isArray(dateValue) ? formatDate(dateValue[0]) : null,
                toDate: Array.isArray(dateValue) ? formatDate(dateValue[1]) : null
            };

            console.log(this.filteredData);
            this.auditLogApi(this.filteredData);
        } catch (error) {
            console.log(error);
        }
    }
    updateRange(selectedValue: any, value: any[], index: number, filter: any) {
        if (!value) value = [];

        value[index] = selectedValue;

        filter(value);
    }
}
