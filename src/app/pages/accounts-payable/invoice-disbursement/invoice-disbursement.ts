import { Shared } from '@/service/shared';
import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-disbursement',
  imports: [Shared],
  templateUrl: './invoice-disbursement.html',
  styleUrl: './invoice-disbursement.scss'
})
export class InvoiceDisbursement {
  invoiceDisbursementList = [
    {
      consultancyCode: 'CLT001',
      giCode: 'GI-9001',
      wbs: 'WBS-TECH-2025',
      costProfitCenter: 'CPC-IT-001',
      stateLocation: 'Karnataka',
      bankDetails: 'HDFC Bank, A/C No: 123456789012, IFSC: HDFC0001234',
      pan: 'AAACC1234F',
      cancelledCheque: '-',
      dueDate: '2025-11-15'
    },
    {
      consultancyCode: 'IWIN002',
      giCode: 'GI-9012',
      wbs: 'WBS-HR-2025',
      costProfitCenter: 'CPC-HR-002',
      stateLocation: 'Tamil Nadu',
      bankDetails: 'ICICI Bank, A/C No: 987654321045, IFSC: ICIC0004567',
      pan: 'AABCI4567P',
      cancelledCheque: '-',
      dueDate: '2025-11-18'
    },
    {
      consultancyCode: 'TS003',
      giCode: 'GI-9020',
      wbs: 'WBS-SERV-2025',
      costProfitCenter: 'CPC-SALES-003',
      stateLocation: 'Maharashtra',
      bankDetails: 'Axis Bank, A/C No: 567890123456, IFSC: UTIB0007890',
      pan: 'AABCT7890Q',
      cancelledCheque: '-',
      dueDate: '2025-11-20'
    }
  ];

}
