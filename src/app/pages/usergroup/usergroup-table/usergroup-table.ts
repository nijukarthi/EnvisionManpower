import { Component } from '@angular/core';
import { Shared } from "@/service/shared";

@Component({
  selector: 'app-usergroup-table',
  imports: [Shared],
  templateUrl: './usergroup-table.html',
  styleUrl: './usergroup-table.scss'
})
export class UsergroupTable {
  usergroups = [
    {
      id: 1,
      usergroup: 'Admin'
    }
  ]
}
