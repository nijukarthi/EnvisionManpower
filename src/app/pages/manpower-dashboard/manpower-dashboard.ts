import { Component, OnInit } from '@angular/core';
import { Chart, ChartData } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Shared } from '@/service/shared';
import { Apiservice } from '../../service/apiservice/apiservice';

// =========================================================
// FILTER TYPES
// =========================================================

interface FilterOption {
    label: string;
    value: string | null;
}

interface MonthOption {
    label: string;
    value: string;
}

interface QuarterOption {
    label: string;
    value: number;
}

interface HalfOption {
    label: string;
    value: number;
}

// =========================================================
// COMPONENT
// =========================================================

@Component({
    selector: 'app-manpower-dashboard',
    standalone: true,
    imports: [Shared],
    templateUrl: './manpower-dashboard.html',
    styleUrl: './manpower-dashboard.scss'
})
export class ManpowerDashboard implements OnInit {
    constructor(private apiService: Apiservice) {
        Chart.register(ChartDataLabels);
    }

    // =========================================================
    // DASHBOARD DATA
    // =========================================================

    dashboardData: any = {};

    // =========================================================
    // STATE FILTER
    // =========================================================

    selectedState: FilterOption | null = null;

    stateOptions: FilterOption[] = [
        {
            label: 'All States',
            value: null
        }
    ];

    // =========================================================
    // SPN FILTER
    // =========================================================

    selectedSPN: FilterOption | null = null;

    spnOptions: FilterOption[] = [
        {
            label: 'All SPN',
            value: null
        }
    ];

    // =========================================================
    // PERIOD TYPE
    // =========================================================

    periodType: 'MONTH' | 'QUARTER' | 'HALF_YEAR' | 'YEAR' = 'MONTH';

    periodTypeOptions = [
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

    // =========================================================
    // YEAR
    // =========================================================

    selectedYear: number = new Date().getFullYear();

    yearOptions: number[] = this.buildYearOptions();

    // =========================================================
    // MONTH
    // =========================================================

    selectedMonth: MonthOption | null = null;

    monthOptions: MonthOption[] = [];

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
    // EXISTING DEMAND CHART
    // =========================================================

    demandChartData = {
        labels: [] as string[],

        datasets: [
            {
                label: 'Employee Rating Distribution',

                data: [] as number[],

                backgroundColor: ['#10B981', '#22C55E', '#F59E0B', '#FB923C', '#EF4444'],

                barThickness: 25
            }
        ]
    };

    // =========================================================
    // DEMAND STATUS
    // =========================================================

    candidateChart = {
        labels: [] as string[],

        datasets: [
            {
                data: [] as number[],

                backgroundColor: ['#F59E0B', '#10B981', '#EF4444'],

                hoverBackgroundColor: ['#D97706', '#059669', '#DC2626']
            }
        ]
    };

    // =========================================================
    // WORKFORCE CHART
    // =========================================================

    workforceChartData: ChartData<'line'> = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

        datasets: [
            {
                label: '2025 Employees',

                data: [],

                borderColor: '#2457C5',

                backgroundColor: 'rgba(36, 87, 197, 0.12)',

                fill: true,

                tension: 0.4,

                borderWidth: 2,

                pointRadius: 4,

                pointHoverRadius: 6,

                pointBackgroundColor: '#FFFFFF',

                pointBorderColor: '#2457C5',

                pointBorderWidth: 2
            },

            {
                label: '2026 Employees',

                data: [],

                borderColor: '#3F82E5',

                backgroundColor: 'rgba(63, 130, 229, 0.10)',

                fill: true,

                tension: 0.4,

                borderWidth: 2,

                pointRadius: 4,

                pointHoverRadius: 6,

                pointBackgroundColor: '#FFFFFF',

                pointBorderColor: '#3F82E5',

                pointBorderWidth: 2
            },

            {
                label: '2027 Employees',

                data: [],

                borderColor: '#8BBFF0',

                backgroundColor: 'rgba(139, 191, 240, 0.10)',

                fill: true,

                tension: 0.4,

                borderWidth: 2,

                pointRadius: 4,

                pointHoverRadius: 6,

                pointBackgroundColor: '#FFFFFF',

                pointBorderColor: '#8BBFF0',

                pointBorderWidth: 2
            }
        ]
    };

    // =========================================================
    // WORKFORCE CHART OPTIONS
    // =========================================================

    workforceChartOptions = {
        responsive: true,

        maintainAspectRatio: false,

        interaction: {
            mode: 'index' as const,
            intersect: false
        },

        scales: {
            x: {
                grid: {
                    display: false
                },

                ticks: {
                    color: '#64748B',

                    font: {
                        size: 11
                    }
                }
            },

            y: {
                beginAtZero: false,

                min: 400,

                max: 1200,

                ticks: {
                    stepSize: 100,

                    color: '#64748B',

                    font: {
                        size: 11
                    }
                },

                grid: {
                    color: '#E5E7EB'
                }
            }
        },

        plugins: {
            legend: {
                display: true,

                position: 'top' as const,

                align: 'start' as const,

                labels: {
                    usePointStyle: true,

                    pointStyle: 'circle',

                    padding: 15,

                    color: '#64748B',

                    font: {
                        size: 11
                    }
                }
            },

            tooltip: {
                enabled: true,

                mode: 'index' as const,

                intersect: false
            },

            datalabels: {
                display: true,

                formatter: (value: unknown) => {
                    if (value === null || value === undefined) {
                        return '';
                    }

                    return Number(value).toLocaleString();
                },

                anchor: 'end' as const,

                align: 'top' as const,

                offset: 6,

                clamp: false,

                clip: false,

                color: '#334155',

                backgroundColor: 'rgba(255, 255, 255, 0.90)',

                borderRadius: 4,

                padding: {
                    top: 2,
                    bottom: 2,
                    left: 4,
                    right: 4
                },

                font: {
                    size: 9,

                    weight: 'bold' as const
                }
            }
        }
    };

    // =========================================================
    // DEMAND CHART OPTIONS
    // =========================================================

    demandChartOptions = {
        responsive: true,

        maintainAspectRatio: false,

        scales: {
            x: {
                grid: {
                    display: false
                }
            },

            y: {
                grid: {
                    display: false
                },

                beginAtZero: true,

                max: 100
            }
        },

        plugins: {
            legend: {
                display: false
            },

            tooltip: {
                enabled: true
            },

            datalabels: {
                display: true,

                color: '#fff',

                font: {
                    weight: 'bold',

                    size: 10
                },

                formatter: (value: number) => value,

                anchor: 'center' as const,

                align: 'center' as const,

                clamp: true
            }
        }
    };

    // =========================================================
    // CANDIDATE CHART OPTIONS
    // =========================================================

    candidateChartOptions = {
        responsive: true,

        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            },

            tooltip: {
                enabled: true
            },

            datalabels: {
                display: true,

                color: '#ffffff',

                font: {
                    weight: 'bold',

                    size: 12
                },

                formatter: (value: number) => value
            }
        }
    };

    // =========================================================
    // INIT
    // =========================================================

    ngOnInit(): void {
        // -----------------------------------------------------
        // Build last 24 months
        // -----------------------------------------------------

        this.monthOptions = this.buildMonthOptions();

        // -----------------------------------------------------
        // Select latest month
        // -----------------------------------------------------

        this.selectedMonth = this.monthOptions[this.monthOptions.length - 1] ?? null;

        // -----------------------------------------------------
        // Load dashboard
        // -----------------------------------------------------

        this.loadDashboard();
    }

    // =========================================================
    // BUILD YEAR OPTIONS
    // =========================================================

    private buildYearOptions(): number[] {
        const currentYear = new Date().getFullYear();

        const years: number[] = [];

        for (let year = 2024; year <= currentYear + 1; year++) {
            years.push(year);
        }

        return years;
    }

    // =========================================================
    // BUILD LAST 24 MONTHS
    // =========================================================

    private buildMonthOptions(): MonthOption[] {
        const months: MonthOption[] = [];

        const currentDate = new Date();

        for (let i = 23; i >= 0; i--) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);

            const year = date.getFullYear();

            const month = date.getMonth() + 1;

            const monthName = date.toLocaleString('default', {
                month: 'long'
            });

            months.push({
                label: `${monthName} ${year}`,

                value: `${year}-${String(month).padStart(2, '0')}`
            });
        }

        return months;
    }

    // =========================================================
    // PARSE MONTH VALUE
    // =========================================================

    private parseMonthValue(value: string): {
        year: number;
        month: number;
    } {
        if (!value) {
            return {
                year: this.selectedYear,
                month: new Date().getMonth() + 1
            };
        }

        const parts = value.split('-');

        return {
            year: Number(parts[0]),

            month: Number(parts[1])
        };
    }

    // =========================================================
    // STATE CHANGE
    // =========================================================

    onStateChange(): void {
        console.log('Selected State:', this.selectedState);

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
    // PERIOD TYPE CHANGE
    // =========================================================

    onPeriodTypeChange(): void {
        console.log('Selected Period Type:', this.periodType);

        // -----------------------------------------------------
        // MONTH
        // -----------------------------------------------------

        if (this.periodType === 'MONTH' && !this.selectedMonth) {
            this.selectedMonth = this.monthOptions[this.monthOptions.length - 1] ?? null;
        }

        // -----------------------------------------------------
        // QUARTER
        // -----------------------------------------------------

        if (this.periodType === 'QUARTER' && !this.selectedQuarter) {
            this.selectedQuarter = this.quarterOptions[0];
        }

        // -----------------------------------------------------
        // HALF YEAR
        // -----------------------------------------------------

        if (this.periodType === 'HALF_YEAR' && !this.selectedHalf) {
            this.selectedHalf = this.halfOptions[0];
        }

        this.loadDashboard();
    }

    // =========================================================
    // YEAR CHANGE
    // =========================================================

    onYearChange(): void {
        console.log('Selected Year:', this.selectedYear);

        // -----------------------------------------------------
        // Only update month when Month period is selected
        // -----------------------------------------------------

        if (this.periodType === 'MONTH') {
            const yearMonths = this.monthOptions.filter((item) => {
                const parsed = this.parseMonthValue(item.value);

                return parsed.year === this.selectedYear;
            });

            if (yearMonths.length > 0) {
                this.selectedMonth = yearMonths[yearMonths.length - 1];
            } else {
                this.selectedMonth = null;
            }
        }

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
    // SELECTED PERIOD LABEL
    // =========================================================

    getSelectedPeriodLabel(): string {
        switch (this.periodType) {
            case 'MONTH':
                return this.selectedMonth?.label ?? `${this.selectedYear}`;

            case 'QUARTER':
                return `${this.selectedQuarter?.label ?? 'Quarter'} ${this.selectedYear}`;

            case 'HALF_YEAR':
                return `${this.selectedHalf?.label ?? 'Half-Year'} ${this.selectedYear}`;

            case 'YEAR':
                return `${this.selectedYear}`;

            default:
                return `${this.selectedYear}`;
        }
    }

    // =========================================================
    // LOAD DASHBOARD
    // =========================================================

    loadDashboard(): void {
        // -----------------------------------------------------
        // Default values
        // -----------------------------------------------------

        let year: number = this.selectedYear;

        let month: number | null = null;

        let quarter: number | null = null;

        let half: number | null = null;

        // =====================================================
        // MONTH
        // =====================================================

        if (this.periodType === 'MONTH') {
            const parsedMonth = this.parseMonthValue(this.selectedMonth?.value ?? '');

            year = parsedMonth.year;

            month = parsedMonth.month;
        }

        // =====================================================
        // QUARTER
        // =====================================================

        if (this.periodType === 'QUARTER') {
            quarter = this.selectedQuarter?.value ?? null;
        }

        // =====================================================
        // HALF YEAR
        // =====================================================

        if (this.periodType === 'HALF_YEAR') {
            half = this.selectedHalf?.value ?? null;
        }

        // =====================================================
        // STATE
        // =====================================================

        const state: string | null = this.selectedState?.value ?? null;

        // =====================================================
        // SPN
        // =====================================================

        const spn: string | null = this.selectedSPN?.value ?? null;

        // =====================================================
        // API REQUEST
        // =====================================================

        const request = {
            year,

            month,

            state,

            spn,

            periodType: this.periodType,

            quarter,

            half
        };

        console.log('Dashboard API Request:', request);

        // =====================================================
        // API CALL
        // =====================================================

        this.apiService.getDashboardSummary(request).subscribe({
            next: (response: any) => {
                console.log('Dashboard Summary:', response);

                this.dashboardData = response?.data ?? response ?? {};

                this.updateCharts();
            },

            error: (error: any) => {
                console.error('Dashboard Summary API Error:', error);
            }
        });
    }

    // =========================================================
    // UPDATE CHARTS
    // =========================================================

    updateCharts(): void {
        // =====================================================
        // WORKFORCE TREND
        // =====================================================

        const workforceTrend = this.dashboardData?.workforceTrend ?? [];

        console.log('Workforce Trend API Data:', workforceTrend);

        this.workforceChartData = {
            labels: workforceTrend.map((item: any) => item.month),

            datasets: [
                {
                    label: '2025 Employees',

                    data: workforceTrend.map((item: any) => Number(item.employees2025 ?? 0)),

                    borderColor: '#2457C5',

                    backgroundColor: 'rgba(36, 87, 197, 0.12)',

                    borderWidth: 2,

                    tension: 0.4,

                    fill: true,

                    pointRadius: 4,

                    pointHoverRadius: 6,

                    pointBackgroundColor: '#FFFFFF',

                    pointBorderColor: '#2457C5',

                    pointBorderWidth: 2
                },

                {
                    label: '2026 Employees',

                    data: workforceTrend.map((item: any) => Number(item.employees2026 ?? 0)),

                    borderColor: '#3F82E5',

                    backgroundColor: 'rgba(63, 130, 229, 0.10)',

                    borderWidth: 2,

                    tension: 0.4,

                    fill: true,

                    pointRadius: 4,

                    pointHoverRadius: 6,

                    pointBackgroundColor: '#FFFFFF',

                    pointBorderColor: '#3F82E5',

                    pointBorderWidth: 2
                },

                {
                    label: '2027 Employees',

                    data: workforceTrend.map((item: any) => Number(item.employees2027 ?? 0)),

                    borderColor: '#8BBFF0',

                    backgroundColor: 'rgba(139, 191, 240, 0.10)',

                    borderWidth: 2,

                    tension: 0.4,

                    fill: true,

                    pointRadius: 4,

                    pointHoverRadius: 6,

                    pointBackgroundColor: '#FFFFFF',

                    pointBorderColor: '#8BBFF0',

                    pointBorderWidth: 2
                }
            ]
        };

        // =====================================================
        // SITE PERFORMANCE RATING
        // =====================================================

        const sitePerformanceRating = this.dashboardData?.sitePerformanceRating ?? [];

        this.demandChartData = {
            labels: sitePerformanceRating.map((item: any) => item.rating),

            datasets: [
                {
                    label: 'Employee Rating Distribution',

                    data: sitePerformanceRating.map((item: any) => Number(item.count ?? 0)),

                    backgroundColor: ['#10B981', '#22C55E', '#F59E0B', '#FB923C', '#EF4444'],

                    barThickness: 25
                }
            ]
        };

        // =====================================================
        // DEMAND STATUS
        // =====================================================

        const demandStatus = this.dashboardData?.demandStatus ?? [];

        this.candidateChart = {
            labels: demandStatus.map((item: any) => item.status),

            datasets: [
                {
                    data: demandStatus.map((item: any) => Number(item.count ?? 0)),

                    backgroundColor: ['#F59E0B', '#10B981', '#EF4444'],

                    hoverBackgroundColor: ['#D97706', '#059669', '#DC2626']
                }
            ]
        };
    }

    // =========================================================
    // ABSOLUTE PERCENT
    // =========================================================

    absPercent(value: number): string {
        return Math.abs(Math.round(value)).toString();
    }
}
