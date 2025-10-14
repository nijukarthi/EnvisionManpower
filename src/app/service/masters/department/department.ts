import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Department {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  fetchActiveDepartments(){
    return this.http.get(`${this.baseUrl}/api/master/department`);
  }

  createNewDepartment(departmentForm: any){
    return this.http.post(`${this.baseUrl}/api/master/department/create`, departmentForm);
  }

  fetchViewDepartment(departmentId: number){
    return this.http.get(`${this.baseUrl}/api/master/department/view?departmentId=${departmentId}`);
  }

  updateDepartment(updateDepartmentForm: any){
    return this.http.put(`${this.baseUrl}/api/master/department/update`, updateDepartmentForm);
  }

  deleteDepartment(departmentId: number){
    return this.http.delete(`${this.baseUrl}/api/master/department/delete?departmentId=${departmentId}`);
  }
}
