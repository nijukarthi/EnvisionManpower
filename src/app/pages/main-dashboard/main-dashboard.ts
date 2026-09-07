import { Shared } from '@/service/shared';
import { Component } from '@angular/core';

export interface KpiCard {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: number;
  subtitle?: string;
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

@Component({
  selector: 'app-main-dashboard',
  imports: [Shared],
  templateUrl: './main-dashboard.html',
  styleUrl: './main-dashboard.scss'
})
export class MainDashboard {
  activeTab = 'overview';

  workforceTrendData: any;
  workforceTrendOptions: any;

  attritionTrendData: any;
  attritionTrendOptions: any;

  // ── Filters ───────────────────────────────────────
  selectedState: any = null;
  selectedSPN: any = null;
  selectedMonth: any = { label: 'April 2026', value: 'apr2026' };

  stateOptions = [
    { label: 'All States', value: null },
    { label: 'Karnataka', value: 'KA' },
    { label: 'Andhra Pradesh', value: 'AP' },
    { label: 'Gujarat', value: 'GJ' },
    { label: 'Maharashtra', value: 'MH' },
  ];

  spnOptions = [
    { label: 'All SPN', value: null },
    { label: 'P-1704', value: 'P-1704' },
    { label: 'P-1615', value: 'P-1615' },
    { label: 'P-1511', value: 'P-1511' },
  ];

  monthOptions = [
    { label: 'January 2026', value: 'jan2026' },
    { label: 'February 2026', value: 'feb2026' },
    { label: 'March 2026', value: 'mar2026' },
    { label: 'April 2026', value: 'apr2026' },
  ];

  // ── Pipeline KPI (5 cards) ────────────────────────
  pipelineCards: KpiCard[] = [
    { label: 'Total Demand', value: '--', icon: 'pi pi-users', color: '#3B82F6', subtitle: 'Open positions' },
    { label: 'Approval', value: '--', icon: 'pi pi-check-circle', color: '#10B981', subtitle: 'Pending approval' },
    { label: 'Hiring', value: '--', icon: 'pi pi-briefcase', color: '#F59E0B', subtitle: 'In hiring stage' },
    { label: 'Onboarding', value: '--', icon: 'pi pi-id-card', color: '#8B5CF6', subtitle: 'Being onboarded' },
    { label: 'GWO Status', value: 747, icon: 'pi pi-shield', color: '#06B6D4', subtitle: 'GWO cleared' },
  ];

  // ── Headcount KPI (4 cards) ───────────────────────
  headcountCards: KpiCard[] = [
    { label: 'Active Employees', value: '--', icon: 'pi pi-user-plus', color: '#10B981', trend: 3.2 },
    { label: 'Overall Headcount', value: 847, icon: 'pi pi-sitemap', color: '#3B82F6', trend: 1.8 },
    { label: 'Resigned Count', value: 181, icon: 'pi pi-user-minus', color: '#EF4444', trend: -2.1 },
    { label: 'Attrition Rate', value: '--%', icon: 'pi pi-chart-line', color: '#F59E0B', trend: -0.5 },
  ];

  // ── Demand Breakdown ──────────────────────────────
  demandBreakdown = {
    totalApproved: 100,
    totalPending: 50,
    existingTransfer: 25,
    trainedRatio: 68,
    turnoverRate: 21,
  };

  // ── Performance KPIs ──────────────────────────────
  perfKpis = [
    { label: 'Evaluations Completed', value: 702, icon: 'pi pi-check-square', color: '#10B981' },
    { label: 'Evaluations Pending', value: 62, icon: 'pi pi-clock', color: '#F59E0B' },
    { label: 'Completion Rate', value: '91.9%', icon: 'pi pi-percentage', color: '#3B82F6' },
    { label: 'Avg Performance Score', value: 76.3, icon: 'pi pi-star', color: '#8B5CF6' },
  ];

  // ── Attendance KPIs ───────────────────────────────
  attendanceKpis = [
    { label: 'Total Effective Man Days', value: '22,742', icon: 'pi pi-calendar-times', color: '#06B6D4' },
    { label: 'Total Present Days', value: '16,568', icon: 'pi pi-calendar-plus', color: '#10B981' },
    { label: 'Total Absent Days', value: 539, icon: 'pi pi-calendar-minus', color: '#EF4444' },
    { label: 'Paid Leaves Taken', value: 308, icon: 'pi pi-sun', color: '#F59E0B' },
  ];

  // ── Rating Distribution ───────────────────────────
  ratingData: RatingItem[] = [
    { grade: 'A', count: 35, percent: 5 },
    { grade: 'B+', count: 143, percent: 20.4 },
    { grade: 'B', count: 356, percent: 50.7 },
    { grade: 'C', count: 135, percent: 19.2 },
    { grade: 'D', count: 33, percent: 4.7 },
  ];

  // ── Top Performers ────────────────────────────────
  topPerformers: TopPerformer[] = [
    { rank: 1, rankLabel: '1st', name: 'Waseem Baig', project: 'P-1704', cluster: 'Karnataka', score: 100, rating: 'A' },
    { rank: 2, rankLabel: '2nd', name: 'R. Siva Mohan Reddy', project: 'P-1615', cluster: 'Andhra Pradesh', score: 100, rating: 'A' },
    { rank: 3, rankLabel: '3rd', name: 'Saleem D Doulattadar', project: 'P-1511', cluster: 'Karnataka', score: 97, rating: 'A' },
    { rank: 4, rankLabel: '4th', name: 'Aakash Dhakad', project: 'P-1934', cluster: 'Gujarat', score: 97, rating: 'A' },
    { rank: 5, rankLabel: '5th', name: 'Ashish Kumar Singh', project: 'P-1429', cluster: 'Maharashtra', score: 97, rating: 'A' },
  ];

  trendKpis: KpiCard[] = [
    {
      label: '3Y Total Hiring',
      value: '2,847',
      icon: 'pi pi-users',
      color: '#3B82F6',
      subtitle: 'Employees hired since 2025'
    },
    {
      label: 'Avg Attrition Rate',
      value: '11.8%',
      icon: 'pi pi-arrow-down-right',
      color: '#EF4444',
      subtitle: 'Average yearly attrition'
    },
    {
      label: 'Demand Fulfillment',
      value: '89%',
      icon: 'pi pi-check-circle',
      color: '#10B981',
      subtitle: 'Positions successfully closed'
    },
    {
      label: 'Retention Rate',
      value: '84%',
      icon: 'pi pi-shield',
      color: '#8B5CF6',
      subtitle: 'Employees retained over 3 years'
    }
  ];

  // ── Chart State ───────────────────────────────────
  attendanceRate = 72.9;
  completionRate = 92;

  pipelineChartData: any;
  pipelineChartOptions: any;
  attendanceChartData: any;
  attendanceChartOptions: any;

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts(): void {
    // ── Pipeline Funnel (horizontal bar) ─────────────
    this.pipelineChartData = {
      labels: ['Total Demand', 'Approved', 'In Hiring', 'Onboarding', 'GWO'],
      datasets: [
        {
          label: 'Count',
          data: [150, 100, 75, 50, 30],
          backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'],
          borderRadius: 5,
          borderSkipped: false,
        },
      ],
    };

    this.pipelineChartOptions = {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { color: 'rgba(148,163,184,0.1)' },
          ticks: { color: '#94A3B8', font: { size: 11 } },
        },
        y: {
          grid: { display: false },
          ticks: { color: '#475569', font: { size: 12, weight: '600' } },
        },
      },
    };

    // ── Attendance Trend (bar + line combo) ───────────
    this.attendanceChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [
        {
          type: 'bar',
          label: 'Effective Man Days',
          data: [19800, 20500, 21200, 22742],
          backgroundColor: 'rgba(59,130,246,0.75)',
          borderRadius: 5,
          yAxisID: 'y',
        },
        {
          type: 'line',
          label: 'Attendance Rate %',
          data: [68, 70.5, 71.2, 72.9],
          borderColor: '#10B981',
          backgroundColor: 'rgba(16,185,129,0.08)',
          borderWidth: 2.5,
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: '#10B981',
          yAxisID: 'y1',
        },
      ],
    };

    this.attendanceChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: {
            color: '#64748B',
            font: { size: 11 },
            usePointStyle: true,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#94A3B8', font: { size: 11 } },
        },
        y: {
          type: 'linear',
          position: 'left',
          grid: { color: 'rgba(148,163,184,0.12)' },
          ticks: {
            color: '#94A3B8',
            font: { size: 11 },
            callback: (v: number) => `${(v / 1000).toFixed(0)}K`,
          },
        },
        y1: {
          type: 'linear',
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: {
            color: '#10B981',
            font: { size: 11 },
            callback: (v: number) => `${v}%`,
          },
          min: 60,
          max: 80,
        },
      },
    };

    this.workforceTrendData = {
      labels: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],

      datasets: [

        /* 2025 EMPLOYEES */

        {
          type: 'line',

          label: '2025 Employees',

          data: [420, 828, 435, 642, 450, 458, 570, 482, 495, 708, 520, 635],

          borderColor: '#1D4ED8',
          backgroundColor: 'rgba(29,78,216,0.10)',

          fill: true,

          tension: 0.45,

          borderWidth: 2,

          pointRadius: 2,
          pointHoverRadius: 6,

          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#1D4ED8',
          pointHoverBorderWidth: 3
        },

        /* 2026 EMPLOYEES */

        {
          type: 'line',

          label: '2026 Employees',

          data: [548, 462, 578, 792, 608, 925, 740, 458, 675, 892, 510, 428],

          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59,130,246,0.10)',

          fill: true,

          tension: 0.45,

          borderWidth: 2,

          pointRadius: 2,
          pointHoverRadius: 6,

          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#3B82F6',
          pointHoverBorderWidth: 3
        },

        /* 2027 EMPLOYEES */

        {
          type: 'line',

          label: '2027 Employees',

          data: [745, 962, 780, 998, 820, 842, 960, 882, 905, 1128, 945, 960],

          borderColor: '#93C5FD',
          backgroundColor: 'rgba(147,197,253,0.12)',

          fill: true,

          tension: 0.45,

          borderWidth: 2,

          pointRadius: 2,
          pointHoverRadius: 6,

          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#93C5FD',
          pointHoverBorderWidth: 3
        }

      ]
    };


    this.workforceTrendOptions = {

      responsive: true,
      maintainAspectRatio: false,

      interaction: {
        mode: 'index',
        intersect: false
      },

      animation: {
        duration: 1200,
        easing: 'easeOutQuart'
      },

      plugins: {

        legend: {

          position: 'top',
          align: 'start',

          labels: {

            color: '#64748B',

            usePointStyle: true,
            pointStyle: 'circle',

            boxWidth: 10,
            boxHeight: 10,

            padding: 20,

            font: {
              size: 11,
              weight: '600'
            }
          }
        },

        tooltip: {

          backgroundColor: 'rgba(15,23,42,0.96)',

          titleColor: '#FFFFFF',
          bodyColor: '#CBD5E1',

          borderColor: 'rgba(148,163,184,0.12)',
          borderWidth: 1,

          cornerRadius: 16,

          padding: 14,

          displayColors: true,

          titleFont: {
            size: 13,
            weight: '600'
          },

          bodyFont: {
            size: 12
          }
        }

      },

      layout: {
        padding: {
          top: 10,
          left: 6,
          right: 10,
          bottom: 4
        }
      },

      scales: {

        /* ═══════════════════════════════════ */
        /* X AXIS                             */
        /* ═══════════════════════════════════ */

        x: {

          grid: {
            display: false,
            drawBorder: false
          },

          border: {
            display: false
          },

          ticks: {

            color: '#94A3B8',

            padding: 10,

            font: {
              size: 11,
              weight: '500'
            }
          }
        },

        /* ═══════════════════════════════════ */
        /* Y AXIS                             */
        /* ═══════════════════════════════════ */

        y: {

          type: 'linear',
          position: 'left',

          grid: {
            color: 'rgba(148,163,184,0.07)',
            drawBorder: false
          },

          border: {
            display: false
          },

          ticks: {

            color: '#64748B',

            padding: 12,

            font: {
              size: 11
            }
          },

          title: {
            display: false
          }
        }

      }
    };


    this.attritionTrendData = {
      labels: ['2025', '2026', '2027'],
      datasets: [
        {
          type: 'bar',
          label: 'Hiring',
          data: [820, 960, 1067],
          backgroundColor: 'rgba(59,130,246,0.75)',
          borderRadius: 6,
          yAxisID: 'y'
        },
        {
          type: 'line',
          label: 'Attrition %',
          data: [14, 12, 10],
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239,68,68,0.1)',
          borderWidth: 2.5,
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: '#EF4444',
          yAxisID: 'y1'
        }
      ]
    };

    this.attritionTrendOptions = {
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
          grid: {
            color: 'rgba(148,163,184,0.12)'
          },
          ticks: {
            color: '#94A3B8'
          }
        },
        y1: {
          type: 'linear',
          position: 'right',
          grid: {
            drawOnChartArea: false
          },
          ticks: {
            color: '#EF4444',
            callback: (value: number) => value + '%'
          },
          min: 0,
          max: 20
        }
      }
    };
  }

  getRankIcon(rank: number): string {
    if (rank === 1) return 'pi pi-trophy';
    if (rank === 2) return 'pi pi-star-fill';
    return 'pi pi-star';
  }
}
