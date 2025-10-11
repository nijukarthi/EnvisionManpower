import { Component } from '@angular/core';
import { Shared } from "@/service/shared";

@Component({
  selector: 'app-department-table',
  imports: [Shared],
  templateUrl: './department-table.html',
  styleUrl: './department-table.scss'
})
export class DepartmentTable {
  departments = [
    {
      id: 1,
      department: 'Projects'
    }
  ]
}
