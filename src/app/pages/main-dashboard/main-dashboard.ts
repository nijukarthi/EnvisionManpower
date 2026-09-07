import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// =========================================================
// PRIME NG
// =========================================================
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ChipModule } from 'primeng/chip';
import { KnobModule } from 'primeng/knob';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

// =========================================================
// SERVICE
// =========================================================
import { Apiservice } from '../../service/apiservice/apiservice';

// =========================================================
// INTERFACES
// =========================================================

export interface KpiCard {
    label: string;
    value: string | number;
    icon: string;
    color: string;
    trend?: number;
    subtitle?: string;
}

export interface FilterOption {
    label: string;
    value: string | null;
}

export interface MonthOption {
    label: string;
    value: string;
}

export interface PeriodOption {
    label: string;
    value: 'MONTH' | 'QUARTER' | 'HALF_YEAR' | 'YEAR';
}

export interface QuarterOption {
    label: string;
    value: number;
}

export interface HalfOption {
    label: string;
    value: number;
}

export interface TopPerformer {
    rank: number;
    rankLabel: string;
    name: string;
    project: string;
    cluster: string;
    score: number;
    rating: string;
}

export interface RatingItem {
    grade: string;
    count: number;
    percent: number;
}

// =========================================================
// COMPONENT
// =========================================================

@Component({
    selector: 'app-main-dashboard',
    standalone: true,

    imports: [CommonModule, FormsModule, ButtonModule, SelectModule, TagModule, BadgeModule, ChartModule, TableModule, ProgressBarModule, AvatarModule, ChipModule, TooltipModule, KnobModule, CardModule],

    templateUrl: './main-dashboard.html',
    styleUrl: './main-dashboard.scss'
})
export class MainDashboard implements OnInit {
    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    constructor(private apiService: Apiservice) {}

    // =========================================================
    // LOADING
    // =========================================================

    isLoading = false;

    dashboardData: any = {};

    // =========================================================
    // ACTIVE TAB
    // =========================================================

    activeTab: 'overview' | 'performance' | 'trends' = 'overview';

    // =========================================================
    // FILTERS
    // =========================================================

    selectedState: FilterOption | null = null;

    selectedSPN: FilterOption | null = null;

    selectedMonth: MonthOption | null = null;

    // =========================================================
    // PERIOD
    // =========================================================

    periodType: 'MONTH' | 'QUARTER' | 'HALF_YEAR' | 'YEAR' = 'MONTH';

    periodTypeOptions: PeriodOption[] = [
        {
            label: 'Month',
            value: 'MONTH'
        },
        {
            label: 'Quarter',
            value: 'QUARTER'
        },
        {
            label: 'Half-Year',
            value: 'HALF_YEAR'
        },
        {
            label: 'Year',
            value: 'YEAR'
        }
    ];

    selectedYear: number = new Date().getFullYear();

    yearOptions: number[] = [];

    // =========================================================
    // QUARTER
    // =========================================================

    selectedQuarter: QuarterOption = {
        label: 'Q1 (Jan-Mar)',
        value: 1
    };

    quarterOptions: QuarterOption[] = [
        {
            label: 'Q1 (Jan-Mar)',
            value: 1
        },
        {
            label: 'Q2 (Apr-Jun)',
            value: 2
        },
        {
            label: 'Q3 (Jul-Sep)',
            value: 3
        },
        {
            label: 'Q4 (Oct-Dec)',
            value: 4
        }
    ];

    // =========================================================
    // HALF YEAR
    // =========================================================

    selectedHalf: HalfOption = {
        label: 'H1 (Jan-Jun)',
        value: 1
    };

    halfOptions: HalfOption[] = [
        {
            label: 'H1 (Jan-Jun)',
            value: 1
        },
        {
            label: 'H2 (Jul-Dec)',
            value: 2
        }
    ];

    // =========================================================
    // STATE OPTIONS
    // =========================================================

    stateOptions: FilterOption[] = [
        {
            label: 'All States',
            value: null
        }
    ];

    // =========================================================
    // SPN OPTIONS
    // =========================================================

    spnOptions: FilterOption[] = [
        {
            label: 'All SPN',
            value: null
        }
    ];

    // =========================================================
    // MONTH OPTIONS
    // =========================================================

    monthOptions: MonthOption[] = [];

    // =========================================================
    // PIPELINE KPI
    // =========================================================

    pipelineCards: KpiCard[] = [
        {
            label: 'Total Demand',
            value: '--',
            icon: 'pi pi-users',
            color: '#3B82F6',
            subtitle: 'Open positions'
        },
        {
            label: 'Approval',
            value: '--',
            icon: 'pi pi-check-circle',
            color: '#10B981',
            subtitle: 'Approved demand'
        },
        {
            label: 'Hiring',
            value: '--',
            icon: 'pi pi-briefcase',
            color: '#F59E0B',
            subtitle: 'In hiring stage'
        },
        {
            label: 'Onboarding',
            value: '--',
            icon: 'pi pi-id-card',
            color: '#8B5CF6',
            subtitle: 'Being onboarded'
        },
        {
            label: 'GWO Status',
            value: '--',
            icon: 'pi pi-shield',
            color: '#06B6D4',
            subtitle: 'GWO cleared'
        }
    ];

    // =========================================================
    // HEADCOUNT KPI
    // =========================================================

    headcountCards: KpiCard[] = [
        {
            label: 'Active Employees',
            value: '--',
            icon: 'pi pi-user-plus',
            color: '#10B981'
        },
        {
            label: 'Overall Headcount',
            value: '--',
            icon: 'pi pi-sitemap',
            color: '#3B82F6'
        },
        {
            label: 'Resigned Count',
            value: '--',
            icon: 'pi pi-user-minus',
            color: '#EF4444'
        },
        {
            label: 'Total Attrition Rate',
            value: '--%',
            icon: 'pi pi-chart-line',
            color: '#F59E0B'
        }
    ];

    // =========================================================
    // DEMAND BREAKDOWN
    // =========================================================

    demandBreakdown = {
        totalApproved: 0,
        totalPending: 0,
        existingTransfer: 0,
        trainedRatio: 0,
        turnoverRate: 0
    };

    // =========================================================
    // PERFORMANCE KPI
    // =========================================================

    perfKpis = [
        {
            label: 'Evaluations Completed',
            value: 0,
            icon: 'pi pi-check-square',
            color: '#10B981'
        },
        {
            label: 'Evaluations Pending',
            value: 0,
            icon: 'pi pi-clock',
            color: '#F59E0B'
        },
        {
            label: 'Completion Rate',
            value: '0%',
            icon: 'pi pi-percentage',
            color: '#3B82F6'
        },
        {
            label: 'Avg Performance Score',
            value: 0,
            icon: 'pi pi-star',
            color: '#8B5CF6'
        }
    ];

    // =========================================================
    // ATTENDANCE KPI
    // =========================================================

    attendanceKpis = [
        {
            label: 'Total Effective Man Days',
            value: '0',
            icon: 'pi pi-calendar-times',
            color: '#06B6D4'
        },
        {
            label: 'Total Present Days',
            value: '0',
            icon: 'pi pi-calendar-plus',
            color: '#10B981'
        },
        {
            label: 'Total Absent Days',
            value: 0,
            icon: 'pi pi-calendar-minus',
            color: '#EF4444'
        },
        {
            label: 'Paid Leaves Taken',
            value: 0,
            icon: 'pi pi-sun',
            color: '#F59E0B'
        }
    ];

    weekOffs = 0;

    // =========================================================
    // RATING
    // =========================================================

    ratingData: any[] = [];

    totalEvaluated = 0;

    // =========================================================
    // TOP PERFORMERS
    // =========================================================

    topPerformers: TopPerformer[] = [];

    // =========================================================
    // GENERAL VALUES
    // =========================================================

    attendanceRate = 0;

    completionRate = 0;

    totalHiring3Y = 0;

    avgAttritionRate3Y = 0;

    momAttritionRate = 0;

    demandFulfillmentRate = 0;

    retentionRate = 0;

    // =========================================================
    // CHART DATA
    // =========================================================

    pipelineChartData: any = null;

    pipelineChartOptions: any = null;

    attendanceChartData: any = null;

    attendanceChartOptions: any = null;

    workforceTrendData: any = null;

    workforceTrendOptions: any = null;

    momAttritionChartData: any = null;

    momAttritionChartOptions: any = null;

    // =========================================================
    // WORKFORCE DATA LABEL PLUGIN
    // =========================================================

    workforceTrendPlugins: any[] = [];

    private readonly dataLabelPlugin = {
        id: 'dataLabelPlugin',

        afterDatasetsDraw(chart: any) {
            const ctx = chart.ctx;

            chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
                const meta = chart.getDatasetMeta(datasetIndex);

                if (meta.hidden) {
                    return;
                }

                meta.data.forEach((point: any, index: number) => {
                    const value = dataset.data[index];

                    if (value === null || value === undefined) {
                        return;
                    }

                    ctx.save();

                    ctx.font = '600 10px sans-serif';

                    ctx.fillStyle = dataset.borderColor || '#64748B';

                    ctx.textAlign = 'center';

                    ctx.fillText(String(value), point.x, point.y - 10);

                    ctx.restore();
                });
            });
        }
    };

    // =========================================================
    // INIT
    // =========================================================

    ngOnInit(): void {
        this.workforceTrendPlugins = [this.dataLabelPlugin];

        this.loadAvailableYears();

        this.loadStates();
    }

    // =========================================================
    // LOAD AVAILABLE YEARS
    // =========================================================

    private loadAvailableYears(): void {
        this.apiService.getAvailableYears({}).subscribe({
            next: (response: any) => {
                console.log('Available Years API Response:', response);

                const data = response?.data ?? response ?? [];

                this.yearOptions = Array.isArray(data)
                    ? data
                          .map((year: any) => Number(year))
                          .filter((year: number) => Number.isFinite(year))
                          .sort((a: number, b: number) => a - b)
                    : [];

                if (this.yearOptions.length === 0) {
                    this.yearOptions = [new Date().getFullYear()];
                }

                if (!this.yearOptions.includes(this.selectedYear)) {
                    this.selectedYear = this.yearOptions[this.yearOptions.length - 1];
                }

                this.updateMonthOptions();

                this.loadDashboard();
            },

            error: (error: any) => {
                console.error('Available Years API Error:', error);

                this.yearOptions = [new Date().getFullYear()];

                this.updateMonthOptions();

                this.loadDashboard();
            }
        });
    }

    // =========================================================
    // LOAD STATES
    // =========================================================

    private loadStates(): void {
        this.apiService.getActiveClusters({}).subscribe({
            next: (response: any) => {
                console.log('Cluster API Response:', response);

                const data = response?.data ?? response ?? [];

                const clusters = Array.isArray(data) ? data : [];

                const options: FilterOption[] = clusters
                    .map((cluster: any) => {
                        const value = cluster?.clusterName ?? cluster?.name ?? cluster?.clusterCode ?? null;

                        return {
                            label: String(value ?? '--'),
                            value: value !== null ? String(value) : null
                        };
                    })
                    .filter((item: FilterOption) => item.value !== null);

                this.stateOptions = [
                    {
                        label: 'All States',
                        value: null
                    },
                    ...options
                ];
            },

            error: (error: any) => {
                console.error('Cluster API Error:', error);

                this.stateOptions = [
                    {
                        label: 'All States',
                        value: null
                    }
                ];
            }
        });
    }

    // =========================================================
    // LOAD SPN BASED ON STATE
    // =========================================================

    private loadSpnOptions(): void {
        const state = this.selectedState?.value ?? null;

        const request = {
            state
        };

        console.log('SPN Request:', request);

        this.apiService.getSpnOptionsForState(request).subscribe({
            next: (response: any) => {
                console.log('SPN API Response:', response);

                const data = response?.data ?? response ?? [];

                const spns = Array.isArray(data) ? data : [];

                const options: FilterOption[] = spns
                    .map((item: any) => {
                        const value = item?.spnCode ?? item?.code ?? item?.spn ?? null;

                        return {
                            label: String(value ?? '--'),
                            value: value !== null ? String(value) : null
                        };
                    })
                    .filter((item: FilterOption) => item.value !== null);

                this.spnOptions = [
                    {
                        label: 'All SPN',
                        value: null
                    },
                    ...options
                ];

                this.selectedSPN = this.spnOptions[0] ?? null;
            },

            error: (error: any) => {
                console.error('SPN API Error:', error);

                this.spnOptions = [
                    {
                        label: 'All SPN',
                        value: null
                    }
                ];

                this.selectedSPN = this.spnOptions[0];
            }
        });
    }

    // =========================================================
    // UPDATE MONTH OPTIONS
    // =========================================================

    private updateMonthOptions(): void {
        if (this.periodType !== 'MONTH') {
            return;
        }

        this.monthOptions = this.buildMonthOptions(this.selectedYear);

        if (this.monthOptions.length === 0) {
            this.selectedMonth = null;

            return;
        }

        const currentSelected = this.selectedMonth?.value;

        const selectedStillExists = this.monthOptions.some((month) => month.value === currentSelected);

        if (!selectedStillExists) {
            this.selectedMonth = this.monthOptions[this.monthOptions.length - 1];
        }
    }

    // =========================================================
    // BUILD MONTH OPTIONS
    // =========================================================

    private buildMonthOptions(year: number): MonthOption[] {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const monthKeys = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

        const result: MonthOption[] = [];

        const now = new Date();

        const currentYear = now.getFullYear();

        const currentMonth = now.getMonth();

        for (let month = 0; month < 12; month++) {
            if (year > currentYear || (year === currentYear && month > currentMonth)) {
                break;
            }

            result.push({
                label: `${monthNames[month]} ${year}`,

                value: `${monthKeys[month]}${year}`
            });
        }

        return result;
    }

    // =========================================================
    // LOAD DASHBOARD
    // =========================================================

    private loadDashboard(): void {
        const request = this.buildDashboardRequest();

        console.log('Dashboard Request:', request);

        this.isLoading = true;

        this.apiService.getDashboardSummary(request).subscribe({
            next: (response: any) => {
                console.log('Dashboard API Response:', response);

                this.dashboardData = response?.data ?? response ?? {};

                this.applyDashboardData();

                this.initCharts();

                this.isLoading = false;
            },

            error: (error: any) => {
                console.error('Dashboard API Error:', error);

                this.dashboardData = {};

                this.resetDashboard();

                this.initCharts();

                this.isLoading = false;
            }
        });
    }

    // =========================================================
    // BUILD DASHBOARD REQUEST
    // =========================================================

    private buildDashboardRequest(): any {
        let year = Number(this.selectedYear);

        let month: number | null = null;

        let quarter: number | null = null;

        let half: number | null = null;

        // -----------------------------------------------------
        // MONTH
        // -----------------------------------------------------

        if (this.periodType === 'MONTH') {
            if (this.selectedMonth?.value) {
                const parsed = this.parseMonthValue(this.selectedMonth.value);
                year = parsed.year;
                month = parsed.month;
            } else {
                month = null;
            }
        }

        // -----------------------------------------------------
        // QUARTER
        // -----------------------------------------------------

        if (this.periodType === 'QUARTER') {
            quarter = this.selectedQuarter?.value ?? null;
        }

        // -----------------------------------------------------
        // HALF YEAR
        // -----------------------------------------------------

        if (this.periodType === 'HALF_YEAR') {
            half = this.selectedHalf?.value ?? null;
        }

        // -----------------------------------------------------
        // REQUEST
        // -----------------------------------------------------

        return {
            year,
            month,

            state: this.selectedState?.value ?? null,

            spn: this.selectedSPN?.value ?? null,

            periodType: this.periodType,

            quarter,

            half
        };
    }

    // =========================================================
    // PARSE MONTH
    // =========================================================

    private parseMonthValue(value: string): {
        year: number;
        month: number | null;
    } {
        if (!value) {
            const now = new Date();

            return {
                year: now.getFullYear(),
                month: now.getMonth() + 1
            };
        }

        const match = value.match(/^([a-z]{3})(\d{4})$/i);

        if (!match) {
            const now = new Date();

            return {
                year: now.getFullYear(),
                month: now.getMonth() + 1
            };
        }

        const monthKeys = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

        const monthIndex = monthKeys.indexOf(match[1].toLowerCase());

        return {
            year: Number(match[2]),

            month: monthIndex >= 0 ? monthIndex + 1 : null
        };
    }

    // =========================================================
    // STATE CHANGE
    // =========================================================

    onStateChange(): void {
        console.log('Selected State:', this.selectedState);

        this.selectedSPN = null;

        // -----------------------------------------------------
        // SPECIFIC STATE
        // -----------------------------------------------------

        if (this.selectedState?.value) {
            this.loadSpnOptions();

            /*
             * Do not immediately call loadDashboard()
             * because loadSpnOptions() is asynchronous.
             *
             * Otherwise the dashboard can be called twice.
             */

            this.loadDashboard();

            return;
        }

        // -----------------------------------------------------
        // ALL STATES
        // -----------------------------------------------------

        this.spnOptions = [
            {
                label: 'All SPN',
                value: null
            }
        ];

        this.selectedSPN = this.spnOptions[0];

        this.loadDashboard();
    }

    // =========================================================
    // SPN CHANGE
    // =========================================================

    onSPNChange(): void {
        console.log('Selected SPN:', this.selectedSPN);

        this.loadDashboard();
    }

    // =========================================================
    // MONTH CHANGE
    // =========================================================

    onMonthChange(): void {
        console.log('Selected Month:', this.selectedMonth);

        this.loadDashboard();
    }

    // =========================================================
    // PERIOD TYPE CHANGE
    // =========================================================

    onPeriodTypeChange(): void {
        console.log('Selected Period Type:', this.periodType);

        if (this.periodType === 'MONTH') {
            this.updateMonthOptions();
        }

        this.loadDashboard();
    }

    // =========================================================
    // YEAR CHANGE
    // =========================================================

    onYearChange(): void {
        console.log('Selected Year:', this.selectedYear);

        if (this.periodType === 'MONTH') {
            this.monthOptions = this.buildMonthOptions(this.selectedYear);

            this.selectedMonth = this.monthOptions[this.monthOptions.length - 1] ?? null;
        }

        this.loadDashboard();
    }

    // =========================================================
    // QUARTER CHANGE
    // =========================================================

    onQuarterChange(): void {
        console.log('Selected Quarter:', this.selectedQuarter);

        this.loadDashboard();
    }

    // =========================================================
    // HALF YEAR CHANGE
    // =========================================================

    onHalfChange(): void {
        console.log('Selected Half-Year:', this.selectedHalf);

        this.loadDashboard();
    }

    // =========================================================
    // COMMON FILTER CHANGE
    // =========================================================

    onFilterChange(): void {
        console.log('Filter Changed:', {
            periodType: this.periodType,

            year: this.selectedYear,

            quarter: this.selectedQuarter,

            half: this.selectedHalf
        });

        this.loadDashboard();
    }

    // =========================================================
    // SELECTED PERIOD LABEL
    // =========================================================

    getSelectedPeriodLabel(): string {
        switch (this.periodType) {
            case 'MONTH':
                return this.selectedMonth?.label ?? `${this.selectedYear}`;

            case 'QUARTER':
                return `${this.selectedQuarter?.label ?? 'Quarter'} ` + `${this.selectedYear}`;

            case 'HALF_YEAR':
                return `${this.selectedHalf?.label ?? 'Half-Year'} ` + `${this.selectedYear}`;

            case 'YEAR':
                return `${this.selectedYear}`;

            default:
                return `${this.selectedYear}`;
        }
    }

    // =========================================================
    // APPLY DASHBOARD DATA
    // =========================================================

    private applyDashboardData(): void {
        const d = this.dashboardData ?? {};

        // =====================================================
        // PIPELINE
        // =====================================================

        this.pipelineCards[0].value = d?.totalDemands ?? '--';

        this.pipelineCards[1].value = Number(d?.approvedDemands ?? 0);

        this.pipelineCards[2].value = this.extractDemandStatusCount(d?.demandStatus, 'Processing');

        this.pipelineCards[3].value = d?.onboarding ?? '--';

        this.pipelineCards[4].value = d?.gwoCleared ?? '--';

        // =====================================================
        // HEADCOUNT
        // =====================================================

        this.headcountCards[0].value = d?.totalEmployees ?? '--';

        this.headcountCards[0].trend = this.toNullableNumber(d?.totalEmployeesTrend?.percentChange);

        this.headcountCards[1].value = d?.overallHeadcount ?? '--';

        this.headcountCards[2].value = d?.resignedCountTotal ?? '--';

        this.headcountCards[3].value = d?.attritionRate != null ? `${d.attritionRate}%` : '--%';

        this.headcountCards[3].trend = this.toNullableNumber(d?.attritionRateTrend);

        // =====================================================
        // DEMAND BREAKDOWN
        // =====================================================

        const totalEmployees = Number(d?.totalEmployees ?? 0);

        const gwoCleared = Number(d?.gwoCleared ?? 0);

        this.demandBreakdown = {
            totalApproved: Number(d?.approvedDemands ?? 0),

            totalPending: Number(d?.pendingApprovals ?? 0),

            existingTransfer: Number(d?.existingTransfer ?? 0),

            trainedRatio: totalEmployees > 0 ? Math.round((gwoCleared / totalEmployees) * 1000) / 10 : 0,

            turnoverRate: Number(d?.turnoverRate ?? 0)
        };

        // =====================================================
        // PERFORMANCE
        // =====================================================

        this.perfKpis[0].value = Number(d?.evaluationsCompleted ?? 0);

        this.perfKpis[1].value = Number(d?.evaluationsPending ?? 0);

        this.perfKpis[2].value = d?.completionRate != null ? `${d.completionRate}%` : '0%';

        this.perfKpis[3].value = Number(d?.avgPerformanceScore ?? 0);

        this.completionRate = Number(d?.completionRate ?? 0);

        // =====================================================
        // TOP PERFORMERS
        // =====================================================

        const performers = Array.isArray(d?.topPerformers) ? d.topPerformers : [];

        this.topPerformers = performers.map((p: any, index: number) => {
            const rank = index + 1;

            return {
                rank,

                rankLabel: `${rank}${this.getRankSuffix(rank)}`,

                name: p?.candidateName ?? p?.name ?? '--',

                project: p?.projectCode ?? p?.project ?? '--',

                cluster: p?.clusterName ?? p?.cluster ?? '--',

                score: Number(p?.score ?? 0),

                rating: p?.rating ?? '--'
            };
        });

        // =====================================================
        // RATING DISTRIBUTION
        // =====================================================
        const ratings = Array.isArray(d?.sitePerformanceRating) ? d.sitePerformanceRating : [];

        this.totalEvaluated = ratings.reduce((sum: number, item: any) => sum + Number(item?.count ?? 0), 0);

        this.ratingData = ratings.map((item: any) => ({
            grade: item?.rating ?? '--',
            count: Number(item?.count ?? 0),
            percent: this.totalEvaluated > 0 ? Math.round((Number(item?.count ?? 0) / this.totalEvaluated) * 1000) / 10 : 0
        }));

        const gradeOrder = ['A', 'B+', 'B', 'C', 'D'];

        this.ratingData.sort((a, b) => gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade));
        // =====================================================
        // ATTENDANCE
        // =====================================================

        const attendance = d?.attendanceSummary ?? {};

        this.attendanceKpis[0].value = attendance?.effectiveManDays != null ? Number(attendance.effectiveManDays).toLocaleString() : '0';

        this.attendanceKpis[1].value = attendance?.presentDays != null ? Number(attendance.presentDays).toLocaleString() : '0';

        this.attendanceKpis[2].value = Number(attendance?.absentDays ?? 0);

        this.attendanceKpis[3].value = Number(attendance?.paidLeaves ?? 0);

        this.weekOffs = Number(attendance?.weekOffs ?? 0);

        this.attendanceRate = Number(attendance?.attendanceRatePercent ?? 0);

        // =====================================================
        // TRENDS
        // =====================================================

        this.totalHiring3Y = Number(d?.totalHiring3Y ?? 0);

        this.avgAttritionRate3Y = Number(d?.avgAttritionRate3Y ?? 0);

        this.momAttritionRate = Number(d?.momAttritionRate ?? 0);

        this.demandFulfillmentRate = Number(d?.demandFulfillmentRate ?? 0);

        this.retentionRate = Number(d?.retentionRate ?? 0);
    }

    // =========================================================
    // DEMAND STATUS
    // =========================================================

    private extractDemandStatusCount(demandStatus: any, label: string): number {
        if (!Array.isArray(demandStatus)) {
            return 0;
        }

        const item = demandStatus.find((status: any) => String(status?.status ?? '').toLowerCase() === label.toLowerCase());

        return Number(item?.count ?? 0);
    }

    // =========================================================
    // NUMBER HELPER
    // =========================================================

    private toNullableNumber(value: any): number | undefined {
        if (value === null || value === undefined || value === '') {
            return undefined;
        }

        const numberValue = Number(value);

        return Number.isFinite(numberValue) ? numberValue : undefined;
    }

    // =========================================================
    // RANK SUFFIX
    // =========================================================

    private getRankSuffix(rank: number): string {
        if (rank % 100 >= 11 && rank % 100 <= 13) {
            return 'th';
        }

        switch (rank % 10) {
            case 1:
                return 'st';

            case 2:
                return 'nd';

            case 3:
                return 'rd';

            default:
                return 'th';
        }
    }

    // =========================================================
    // RESET DASHBOARD
    // =========================================================

    private resetDashboard(): void {
        // -----------------------------------------------------
        // Pipeline
        // -----------------------------------------------------

        this.pipelineCards.forEach((card) => {
            card.value = '--';

            card.trend = undefined;
        });

        // -----------------------------------------------------
        // Headcount
        // -----------------------------------------------------

        this.headcountCards.forEach((card) => {
            card.value = '--';

            card.trend = undefined;
        });

        // -----------------------------------------------------
        // Demand
        // -----------------------------------------------------

        this.demandBreakdown = {
            totalApproved: 0,

            totalPending: 0,

            existingTransfer: 0,

            trainedRatio: 0,

            turnoverRate: 0
        };

        // -----------------------------------------------------
        // Performance
        // -----------------------------------------------------

        this.perfKpis[0].value = 0;

        this.perfKpis[1].value = 0;

        this.perfKpis[2].value = '0%';

        this.perfKpis[3].value = 0;

        this.completionRate = 0;

        // -----------------------------------------------------
        // Attendance
        // -----------------------------------------------------

        this.attendanceKpis[0].value = '0';

        this.attendanceKpis[1].value = '0';

        this.attendanceKpis[2].value = 0;

        this.attendanceKpis[3].value = 0;

        this.weekOffs = 0;

        this.attendanceRate = 0;

        // -----------------------------------------------------
        // Rating
        // -----------------------------------------------------

        this.ratingData = [];

        this.totalEvaluated = 0;

        // -----------------------------------------------------
        // Performers
        // -----------------------------------------------------

        this.topPerformers = [];

        // -----------------------------------------------------
        // Trends
        // -----------------------------------------------------

        this.totalHiring3Y = 0;

        this.avgAttritionRate3Y = 0;

        this.momAttritionRate = 0;

        this.demandFulfillmentRate = 0;

        this.retentionRate = 0;

        // -----------------------------------------------------
        // Charts
        // -----------------------------------------------------

        this.pipelineChartData = null;

        this.attendanceChartData = null;

        this.workforceTrendData = null;

        this.momAttritionChartData = null;

        this.momAttritionChartOptions = null;
    }

    // =========================================================
    // INITIALIZE CHARTS
    // =========================================================

    private initCharts(): void {
        const d = this.dashboardData ?? {};

        // =====================================================
        // PIPELINE CHART
        // =====================================================

        const totalDemand = Number(d?.totalDemands ?? 0);

        const approved = Number(d?.approvedDemands ?? 0);

        const processing = this.extractDemandStatusCount(d?.demandStatus, 'Processing');

        const onboarding = Number(d?.onboarding ?? 0);

        const gwo = Number(d?.gwoCleared ?? 0);

        this.pipelineChartData = {
            labels: ['Total Demand', 'Approved', 'In Hiring', 'Onboarding', 'GWO'],

            datasets: [
                {
                    label: 'Count',

                    data: [totalDemand, approved, processing, onboarding, gwo],

                    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'],

                    borderRadius: 5,

                    borderSkipped: false
                }
            ]
        };

        this.pipelineChartOptions = {
            indexAxis: 'y',

            responsive: true,

            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                x: {
                    beginAtZero: true,

                    grid: {
                        color: 'rgba(148,163,184,0.1)'
                    },

                    ticks: {
                        color: '#94A3B8',

                        font: {
                            size: 11
                        }
                    }
                },

                y: {
                    grid: {
                        display: false
                    },

                    ticks: {
                        color: '#475569',

                        font: {
                            size: 12,
                            weight: '600'
                        }
                    }
                }
            }
        };

        // =====================================================
        // ATTENDANCE CHART
        // =====================================================

        const attendanceTrend = Array.isArray(d?.attendanceTrend) ? d.attendanceTrend : [];

        this.attendanceChartData = {
            labels: attendanceTrend.map((item: any) => item?.month ?? ''),

            datasets: [
                {
                    type: 'bar',

                    label: 'Effective Man Days',

                    data: attendanceTrend.map((item: any) => (item?.effectiveManDays == null ? null : Number(item.effectiveManDays))),

                    backgroundColor: 'rgba(59,130,246,0.75)',

                    borderRadius: 5,

                    yAxisID: 'y'
                },

                {
                    type: 'line',

                    label: 'Attendance Rate %',

                    data: attendanceTrend.map((item: any) => (item?.attendanceRatePercent == null ? null : Number(item.attendanceRatePercent))),

                    borderColor: '#10B981',

                    backgroundColor: 'rgba(16,185,129,0.08)',

                    borderWidth: 2.5,

                    tension: 0.4,

                    fill: true,

                    pointRadius: 5,

                    pointBackgroundColor: '#10B981',

                    yAxisID: 'y1'
                }
            ]
        };

        this.attendanceChartOptions = {
            responsive: true,

            maintainAspectRatio: false,

            spanGaps: false,

            interaction: {
                mode: 'index',
                intersect: false
            },

            plugins: {
                legend: {
                    labels: {
                        color: '#64748B',

                        font: {
                            size: 11
                        },

                        usePointStyle: true
                    }
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    },

                    ticks: {
                        color: '#94A3B8'
                    }
                },

                y: {
                    type: 'linear',

                    position: 'left',

                    beginAtZero: true,

                    grid: {
                        color: 'rgba(148,163,184,0.12)'
                    },

                    ticks: {
                        color: '#94A3B8',

                        callback: (value: number) => `${(Number(value) / 1000).toFixed(0)}K`
                    }
                },

                y1: {
                    type: 'linear',

                    position: 'right',

                    beginAtZero: true,

                    max: 100,

                    grid: {
                        drawOnChartArea: false
                    },

                    ticks: {
                        color: '#10B981',

                        callback: (value: number) => `${value}%`
                    }
                }
            }
        };

        this.attendanceChartOptions = {
            responsive: true,

            maintainAspectRatio: false,

            interaction: {
                mode: 'index',
                intersect: false
            },

            plugins: {
                legend: {
                    labels: {
                        color: '#64748B',

                        font: {
                            size: 11
                        },

                        usePointStyle: true
                    }
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    },

                    ticks: {
                        color: '#94A3B8'
                    }
                },

                y: {
                    type: 'linear',

                    position: 'left',

                    beginAtZero: true,

                    grid: {
                        color: 'rgba(148,163,184,0.12)'
                    },

                    ticks: {
                        color: '#94A3B8',

                        callback: (value: number) => `${(Number(value) / 1000).toFixed(0)}K`
                    }
                },

                y1: {
                    type: 'linear',

                    position: 'right',

                    beginAtZero: true,

                    max: 100,

                    grid: {
                        drawOnChartArea: false
                    },

                    ticks: {
                        color: '#10B981',

                        callback: (value: number) => `${value}%`
                    }
                }
            }
        };

        // =====================================================
        // WORKFORCE TREND
        // =====================================================

        const workforceTrend = Array.isArray(d?.workforceTrend) ? d.workforceTrend : [];

        this.workforceTrendData = {
            labels: workforceTrend.map((item: any) => item?.month ?? ''),

            datasets: [
                {
                    label: `${d?.workforceTrendYear1 ?? ''} Employees`,

                    data: workforceTrend.map((item: any) => (item?.employeesYear1 == null ? null : Number(item.employeesYear1))),

                    borderColor: '#2456C7',
                    backgroundColor: 'rgba(36,86,199,0.12)',

                    borderWidth: 2,
                    tension: 0.4,

                    fill: true,

                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#2456C7'
                },

                {
                    label: `${d?.workforceTrendYear2 ?? ''} Employees`,

                    data: workforceTrend.map((item: any) => (item?.employeesYear2 == null ? null : Number(item.employeesYear2))),

                    borderColor: '#4387E8',
                    backgroundColor: 'rgba(67,135,232,0.08)',

                    borderWidth: 2,
                    tension: 0.4,

                    fill: true,

                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#4387E8'
                },

                {
                    label: `${d?.workforceTrendYear3 ?? ''} Employees`,

                    data: workforceTrend.map((item: any) => (item?.employeesYear3 == null ? null : Number(item.employeesYear3))),

                    borderColor: '#8FC1F1',
                    backgroundColor: 'rgba(143,193,241,0.10)',

                    borderWidth: 2,
                    tension: 0.4,

                    fill: true,

                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#8FC1F1'
                }
            ]
        };

        this.workforceTrendOptions = {
            responsive: true,

            maintainAspectRatio: false,

            spanGaps: false,

            interaction: {
                mode: 'index',

                intersect: false
            },

            plugins: {
                legend: {
                    display: true,

                    position: 'top',

                    align: 'start',

                    labels: {
                        usePointStyle: true,

                        pointStyle: 'circle',

                        color: '#64748B',

                        padding: 16,

                        font: {
                            size: 12,

                            weight: '500'
                        }
                    }
                },

                tooltip: {
                    enabled: true,

                    mode: 'index',

                    intersect: false
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    },

                    ticks: {
                        color: '#94A3B8',

                        font: {
                            size: 11
                        }
                    }
                },

                y: {
                    beginAtZero: true,

                    grid: {
                        color: 'rgba(148,163,184,0.12)',

                        drawBorder: false
                    },

                    ticks: {
                        color: '#64748B',

                        font: {
                            size: 11
                        },

                        callback: (value: number) => Number(value).toLocaleString()
                    }
                }
            }
        };

        // =====================================================
        // MOM ATTRITION
        // =====================================================

        const momTrend = Array.isArray(d?.momAttritionTrend) ? d.momAttritionTrend : [];

        this.momAttritionChartData = {
            labels: momTrend.map((item: any) => item?.month ?? ''),

            datasets: [
                {
                    label: 'MoM Attrition Rate %',

                    data: momTrend.map((item: any) => (item?.momAttritionRate == null ? null : Number(item.momAttritionRate))),

                    borderColor: '#EF4444',

                    backgroundColor: 'rgba(239,68,68,0.08)',

                    borderWidth: 2,

                    tension: 0.4,

                    fill: true,

                    pointRadius: 4,

                    pointHoverRadius: 6,

                    pointBackgroundColor: '#EF4444',

                    spanGaps: false
                }
            ]
        };

        this.momAttritionChartOptions = {
            responsive: true,

            maintainAspectRatio: false,

            spanGaps: false,

            interaction: {
                mode: 'index',

                intersect: false
            },

            plugins: {
                legend: {
                    display: true,

                    position: 'top',

                    align: 'start',

                    labels: {
                        usePointStyle: true,

                        pointStyle: 'circle',

                        color: '#64748B',

                        padding: 16,

                        font: {
                            size: 12,

                            weight: '500'
                        }
                    }
                },

                tooltip: {
                    enabled: true,

                    mode: 'index',

                    intersect: false,

                    callbacks: {
                        label: (context: any) => {
                            const value = context?.parsed?.y;

                            return value == null ? 'MoM Attrition Rate: --' : `MoM Attrition Rate: ${value}%`;
                        }
                    }
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    },

                    ticks: {
                        color: '#94A3B8',

                        font: {
                            size: 11
                        }
                    }
                },

                y: {
                    beginAtZero: true,

                    grid: {
                        color: 'rgba(148,163,184,0.12)',

                        drawBorder: false
                    },

                    ticks: {
                        color: '#64748B',

                        font: {
                            size: 11
                        },

                        callback: (value: number) => `${value}%`
                    }
                }
            }
        };
    }

    // =========================================================
    // RANK ICON
    // =========================================================

    getRankIcon(rank: number): string {
        if (rank === 1) {
            return 'pi pi-trophy';
        }

        if (rank === 2) {
            return 'pi pi-star-fill';
        }

        return 'pi pi-star';
    }

    // =========================================================
    // TAB CHANGE
    // =========================================================

    changeTab(tab: 'overview' | 'performance' | 'trends'): void {
        this.activeTab = tab;
    }

    // =========================================================
    // REFRESH
    // =========================================================

    refreshDashboard(): void {
        this.loadDashboard();
    }

    // =========================================================
    // EXPORT
    // =========================================================

    exportDashboard(): void {
        console.log('Export dashboard');

        // Add Excel/PDF export logic here.
    }
}
