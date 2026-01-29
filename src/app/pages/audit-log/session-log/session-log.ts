import { Component, OnInit } from '@angular/core';
import { Shared } from '@/service/shared';
import { Apiservice } from '@/service/apiservice/apiservice';

@Component({
    selector: 'app-session-log',
    imports: [Shared],
    templateUrl: './session-log.html',
    styleUrl: './session-log.scss'
})
export class SessionLog {
    offSet = 0;
    pageSize = 10;
    first = 0;
    totalRecords = 0;

    filteredData: any;

    SessionlogsList: any;

    constructor(private apiService: Apiservice) {}

    ngOnInit(): void {
        this.fetchLogsList();
    }

    sessionLogApi(data: any) {
        try {
            this.apiService.sessionlogsList(data).subscribe({
                next: (val) => {
                    console.log(val);
                    this.SessionlogsList = val?.data?.data;
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

    fetchLogsList(isRefresh = false) {
        try {
            if (isRefresh) {
                this.offSet = 0;
                this.first = 0;
            }

            const data = {
                offSet: this.offSet,
                pageSize: this.pageSize
            };
            console.log(data);
            this.sessionLogApi(data);
        } catch (error) {
            console.log(error);
        }
    }

    private formatDateForApi(date: Date, isEndDate = false) {
        if (!date) return null as any;

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');

        const time = isEndDate ? '23:59:59' : '00:00:00';

        return `${yyyy}-${mm}-${dd}T${time}Z`;
    }

    getFilterValues(filters: any, field: string): string[] | null {
        const rules = filters?.[field];
        if (!Array.isArray(rules)) return null;

        const values = rules.map((rule) => rule?.value).filter((v) => v !== null && v !== '');

        return values.length ? values : null;
    }

    loadSessionLog(event: any) {
        try {
            this.first = event.first;
            this.offSet = event.first / event.rows;
            this.pageSize = event.rows;

            const filters = event.filters;
            console.log(filters);

            const dateValue = filters?.date?.[0]?.value;

            const from = Array.isArray(dateValue) ? dateValue[0] : null;
            const to = Array.isArray(dateValue) ? dateValue[1] : null;

            this.filteredData = {
                offSet: this.offSet,
                pageSize: this.pageSize,
                username: filters?.userName?.[0]?.value?.trim() ?? null,
                userGroupName: filters?.userGroupName?.[0]?.value ?? null,
                emailOrPhone: filters?.email?.[0]?.value ?? null,
                jti: filters?.sessionId?.[0]?.value ?? null,
                fromDate: from ? this.formatDateForApi(from, false) : null,
                toDate: to ? this.formatDateForApi(to, true) : null
            };

            console.log(this.filteredData);
            this.sessionLogApi(this.filteredData);
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
