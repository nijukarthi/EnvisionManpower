import { Shared } from '@/service/shared';
import { Component } from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-manpower-dashboard',
  imports: [Shared],
  templateUrl: './manpower-dashboard.html',
  styleUrl: './manpower-dashboard.scss'
})
export class ManpowerDashboard {
  constructor() {
    // ✅ Register plugin here
    Chart.register(ChartDataLabels);
  }

  years = [2025, 2026];

  selectedMonth = new Date().getMonth() + 1; // default current month
  selectedYear = new Date().getFullYear();
  
  demandChartData = {
    labels: ['A', 'B+', 'B', 'C', 'D'],
    datasets: [
      {
        label: 'Employee Rating Distribution',
        data: [20, 15, 10, 5, 2], // 👈 count of employees
        backgroundColor: [
          '#10B981', // A - green
          '#22C55E', // B+ - light green
          '#F59E0B', // B - yellow
          '#FB923C', // C - orange
          '#EF4444'  // D - red
        ],
        barThickness: 25
      }
    ]
  };

candidateChart = {
  labels: ['Processing', 'Completed', 'Rejected'],
  datasets: [
    {
      data: [12, 25, 6],
      backgroundColor: [
        '#F59E0B', // 🟡 Processing - yellow
        '#10B981', // 🟢 Completed - green
        '#EF4444'  // 🔴 Rejected - red
      ],
      hoverBackgroundColor: [
        '#D97706', // darker yellow on hover
        '#059669',
        '#DC2626'
      ]
    }
  ]
};

recentDemands = [
  { id: 'R1911001-1', project: 'P-8001', status: 'Processing', createdOn: '25 Apr' },
  { id: 'R1911001-2', project: 'P-8007', status: 'Completed', createdOn: '27 Apr' }
];

pendingInterviews = [
  { name: 'John Doe', position: 'Electrical Engineer', date: '25 Apr' },
  { name: 'Jane Smith', position: 'Project Manager', date: '27 Apr' }
];

topConsultancies = [
  { name: 'Cloute Technologies Private Limited', activeDemands: 28, hired: 15 },
  { name: 'Talent Path Solutions', activeDemands: 22, hired: 10 },
  { name: 'Brilliance Technology', activeDemands: 18, hired: 8 },
  { name: 'Wiscom Manpower Solution', activeDemands: 15, hired: 6 },
  { name: 'Key Resource Manpower Consultancy', activeDemands: 12, hired: 4 }
];

demandChartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  scales: {
    x: {
      grid: { display: false }
    },
    y: {
      grid: { display: false },
      beginAtZero: true,
      max: 100
    }
  },

  plugins: {
    legend: { display: false },

    tooltip: {
      enabled: true // 👈 keeps hover values
    },

    datalabels: {
      display: true, // 👈 ALWAYS show inside bars
      color: '#fff',
      font: {
        weight: 'bold',
        size: 10
      },
      formatter: (value: number) => value,
      anchor: 'center',
      align: 'center',
      clamp: true
    }
  }
};

candidateChartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false
    },

    tooltip: {
      enabled: true // 👈 keep hover
    },

    datalabels: {
      display: true, // 👈 show inside pie
      color: '#ffffff', // 👈 WHITE TEXT
      font: {
        weight: 'bold',
        size: 12
      },
      formatter: (value: number) => value, // 👈 show number
    }
  }
};

consultancyStatusData = [
  { name: 'Cloute Technologies Private Limited', fixedCost: 20, costPlus: 25, active: 45, resigned: 10 },
  { name: 'Talent Path Solutions', fixedCost: 12, costPlus: 18, active: 30, resigned: 5 },
  { name: 'Brilliance Technology', fixedCost: 10, costPlus: 15, active: 25, resigned: 8 },
  { name: 'Wiscom Manpower Solution', fixedCost: 28, costPlus: 22, active: 50, resigned: 12 }
];

spnEmployeeData = [
  {
    spnCode: 'SPN328347',
    spnDescription: 'Electrical Technician',
    active: 40,
    resigned: 8
  },
  {
    spnCode: 'SPN328348',
    spnDescription: 'Site Supervisor',
    active: 25,
    resigned: 5
  },
  {
    spnCode: 'SPN328349',
    spnDescription: 'Safety Officer',
    active: 18,
    resigned: 3
  },
  {
    spnCode: 'SPN328350',
    spnDescription: 'Civil Engineer',
    active: 30,
    resigned: 7
  }
];

  months = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 }
  ];

  topPerformers = [
    { name: 'Alice Johnson', project: 'P-1704', cluster: 'Karnataka',  score: 98, rating: 'A' },
    { name: 'Ravi Kumar',    project: 'P-1615',  cluster: 'Andhra Pradesh', score: 99, rating: 'A' },
    { name: 'Sara Chen',     project: 'P-1511',  cluster: 'Karnataka',   score: 95, rating: 'A' },
    { name: 'Priya Nair',    project: 'P-1429',  cluster: 'Maharashtra',  score: 92, rating: 'A' },
    { name: 'James Smith',   project: 'P-1934', cluster: 'Gujarat',       score: 91, rating: 'A' },
  ];

  get filteredMonths() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // If selected year is current year → limit months
    if (this.selectedYear === currentYear) {
      return this.months.filter(m => m.value <= currentMonth);
    }

    // If past year → show all months
    if (this.selectedYear < currentYear) {
      return this.months;
    }

    // If future year → (optional logic)
    return [];
  }

  onYearChange() {
    this.selectedMonth = 0;
  }

}
