import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-po-assign-table',
  imports: [Shared],
  templateUrl: './po-assign-table.html',
  styleUrl: './po-assign-table.scss'
})
export class PoAssignTable implements OnInit {
  poList: any; 

  offSet = 0;
  pageSize = 10;

  constructor(private apiService: Apiservice){}

  ngOnInit(): void {
    this.fetchPOList();
  }

  fetchPOList(){
    try {
      const data = {
        offSet: this.offSet,
        pageSize: this.pageSize
      }

      console.log(data);

      this.apiService.fetchPOList(data).subscribe({
        next: val => {
          console.log(val);
          this.poList = val.data.data;
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  poAssignData = [
    {
      slNo: 1,
      projectCode: "P8001",
      siteName: "Karnataka",
      demandCode: "R2111001-1",
      candidateCode: "JOR001",
      spnCode: 'SPN328353',
      spnDescription: 'Projects Civil Manager',
      experience: '8-10 years',
      consultancy: 'Talent Path Solutions',
      requestedBy: "Admin",
      poNumber: "PO-2025-01001",
      poDate: "2025-01-10",
      unitPrice: 12500,
      poValue: 250000,
      taxAmount: 45000,
      totalAmount: 295000,
      poValidTill: "2025-06-30",
      duration: "6 Months"
    },
    {
      slNo: 2,
      projectCode: "P8002",
      siteName: "Karnataka",
      demandCode: "R2111002-1",
      candidateCode: "SHI002",
      spnCode: 'SPN328378',
      spnDescription: 'Project Commissioning Manager',
      experience: '3-5 years',
      consultancy: 'Talent Path Solutions',
      requestedBy: "Admin",
      poNumber: "PO-2025-01002",
      poDate: "2025-01-12",
      unitPrice: 11000,
      poValue: 220000,
      taxAmount: 39600,
      totalAmount: 259600,
      poValidTill: "2025-07-31",
      duration: "5 Months"
    },
    {
      slNo: 3,
      projectCode: "P8003",
      siteName: "Tamil Nadu",
      demandCode: "R2111002-2",
      candidateCode: "MAN003",
      spnCode: 'SPN328390',
      spnDescription: 'Projects QEHS Engineer',
      experience: '5-8 years',
      consultancy: 'Cloute Technologies Private Limited',
      requestedBy: "Admin",
      poNumber: "PO-2025-01003",
      poDate: "2025-01-15",
      unitPrice: 13500,
      poValue: 270000,
      taxAmount: 48600,
      totalAmount: 318600,
      poValidTill: "2025-06-20",
      duration: "4 Months"
    },
    {
      slNo: 4,
      projectCode: "P8004",
      siteName: "Tamil Nadu",
      demandCode: "R2111003-1",
      candidateCode: "SHA004",
      spnCode: 'SPN328388',
      spnDescription: 'Project Installation Manager',
      experience: '3-5 years',
      consultancy: 'Cloute Technologies Private Limited',
      requestedBy: "Admin",
      poNumber: "PO-2025-01004",
      poDate: "2025-02-01",
      unitPrice: 12000,
      poValue: 240000,
      taxAmount: 43200,
      totalAmount: 283200,
      poValidTill: "2025-08-01",
      duration: "6 Months"
    },
    {
      slNo: 5,
      projectCode: "P8005",
      siteName: "Tamil Nadu",
      demandCode: "R2111004-1",
      candidateCode: "SUR005",
      spnCode: 'SPN328377',
      spnDescription: 'Projects QEHS Engineer',
      experience: '5-8 years',
      consultancy: 'Cloute Technologies Private Limited',
      requestedBy: "Admin",
      poNumber: "PO-2025-01005",
      poDate: "2025-02-07",
      unitPrice: 9800,
      poValue: 196000,
      taxAmount: 35280,
      totalAmount: 231280,
      poValidTill: "2025-09-01",
      duration: "6 Months"
    },
    {
      slNo: 6,
      projectCode: "P8006",
      siteName: "Karnataka",
      demandCode: "R2111005-1",
      candidateCode: "SAN006",
      spnCode: 'SPN328363',
      spnDescription: 'Project Installation Manager ',
      experience: '3-5 years',
      consultancy: 'Cloute Technologies Private Limited',
      requestedBy: "Admin",
      poNumber: "PO-2025-01006",
      poDate: "2025-02-15",
      unitPrice: 14000,
      poValue: 280000,
      taxAmount: 50400,
      totalAmount: 330400,
      poValidTill: "2025-07-20",
      duration: "5 Months"
    },
    {
      slNo: 7,
      projectCode: "P8010",
      siteName: "Tamil Nadu",
      demandCode: "R2111006-1",
      candidateCode: "KAY007",
      spnCode: 'SPN328350',
      spnDescription: 'Projects QEHS Engineer',
      experience: '8-10 years',
      consultancy: 'Cloute Technologies Private Limited',
      requestedBy: "Admin",
      poNumber: "PO-2025-01007",
      poDate: "2025-02-20",
      unitPrice: 11800,
      poValue: 236000,
      taxAmount: 42480,
      totalAmount: 278480,
      poValidTill: "2025-09-15",
      duration: "7 Months"
    },
    {
      slNo: 8,
      projectCode: "P8020",
      siteName: "Karnataka",
      demandCode: "R2111007-1",
      candidateCode: "DAR008",
      spnCode: 'SPN328663',
      spnDescription: 'Project Installation Manager ',
      experience: '3-5 years',
      consultancy: 'Cloute Technologies Private Limited',
      requestedBy: "Admin",
      poNumber: "PO-2025-01008",
      poDate: "2025-01-25",
      unitPrice: 15000,
      poValue: 300000,
      taxAmount: 54000,
      totalAmount: 354000,
      poValidTill: "2025-06-10",
      duration: "6 Months"
    },
    {
      slNo: 9,
      projectCode: "P8050",
      siteName: "Karnataka",
      demandCode: "R2111008-1",
      candidateCode: "JRO009",
      spnCode: 'SPN328441',
      spnDescription: 'Projects QEHS Engineer',
      experience: '8-10 years',
      consultancy: 'Cloute Technologies Private Limited',
      requestedBy: "Admin",
      poNumber: "PO-2025-01009",
      poDate: "2025-03-01",
      unitPrice: 10500,
      poValue: 210000,
      taxAmount: 37800,
      totalAmount: 247800,
      poValidTill: "2025-08-30",
      duration: "5 Months"
    },
    {
      slNo: 10,
      projectCode: "P8100",
      siteName: "Tamil Nadu",
      demandCode: "R2111009-1",
      candidateCode: "CAD010",
      spnCode: 'SPN328309',
      spnDescription: 'Project Commissioning Manager',
      experience: '5-8 years',
      consultancy: 'Cloute Technologies Private Limited',
      requestedBy: "Admin",
      poNumber: "PO-2025-01010",
      poDate: "2025-03-05",
      unitPrice: 11200,
      poValue: 224000,
      taxAmount: 40320,
      totalAmount: 264320,
      poValidTill: "2025-09-15",
      duration: "6 Months"
    }
  ];
}
