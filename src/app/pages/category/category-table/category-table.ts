import { Component } from '@angular/core';
import { Shared } from "@/service/shared";

@Component({
  selector: 'app-category-table',
  imports: [Shared],
  templateUrl: './category-table.html',
  styleUrl: './category-table.scss'
})
export class CategoryTable {
  categories = [
    {
      id: 1,
      name: ''
    }
  ]
}
