import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Usergroup {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  fetchActiveUsergroup(){
    return this.http.get(`${this.baseUrl}/api/master/usergroup`);
  }

  createNewUsergroup(usergroupForm: any){
    return this.http.post(`${this.baseUrl}/api/master/usergroup/create`, usergroupForm);
  }

  fetchViewUsergroup(userGroupId: number){
    return this.http.get(`${this.baseUrl}/api/master/usergroup/view?userGroupId=${userGroupId}`);
  }

  updateUserGroup(usergroupForm: any){
    return this.http.put(`${this.baseUrl}/api/master/usergroup/update`, usergroupForm);
  }

  deleteUserGroup(userGroupId: number){
    return this.http.delete(`${this.baseUrl}/api/master/usergroup/delete?userGroupId=${userGroupId}`);
  }
}
