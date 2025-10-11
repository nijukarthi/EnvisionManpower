import { Component } from '@angular/core';
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-spn-table',
  imports: [TableModule, ButtonModule],
  templateUrl: './spn-table.html',
  styleUrl: './spn-table.scss'
})
export class SpnTable {
  spn = [
    
  ]
}
