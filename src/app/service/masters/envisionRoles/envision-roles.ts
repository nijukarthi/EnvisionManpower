import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EnvisionRolesService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  fetchActiveEnvisionRoles(){
    return this.http.get(`${this.baseUrl}/api/master/env-role`);
  }

  createNewRole(roleForm: any){
    return this.http.post(`${this.baseUrl}/api/master/env-role/create`, roleForm);
  }

  fetchViewRole(roleId: number){
    return this.http.get(`${this.baseUrl}/api/master/env-role/view?id=${roleId}`);
  }

  updateRole(updateRoleForm: any){
    return this.http.put(`${this.baseUrl}/api/master/env-role/update`, updateRoleForm);
  }

  deleteRole(roleId: number){
    return this.http.delete(`${this.baseUrl}/api/master/env-role/delete?id=${roleId}`);
  }
}
