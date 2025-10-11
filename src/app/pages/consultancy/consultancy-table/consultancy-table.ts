import { Component } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-consultancy-table',
  imports: [ButtonModule, TableModule],
  templateUrl: './consultancy-table.html',
  styleUrl: './consultancy-table.scss'
})
export class ConsultancyTable {
  consultancy = [
    {
      id: 1,
      name: 'Cloute Technology',
      phone: 7548839399,
      email: 'cloute.co.in',
    }
  ]
}
